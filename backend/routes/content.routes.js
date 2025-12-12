const express = require('express');
const multer = require('multer');
const pdfParse = require('pdf-parse');

const fs = require('fs').promises;
const path = require('path');
const Content = require('../models/Content.models');
const { generateSummary } = require('../services/geminiServices');

const router = express.Router();

// Ensure uploads folder exists
const UPLOAD_DIR = path.join(__dirname, '..', 'uploads');

// Create uploads directory if it doesn't exist
(async () => {
  try {
    await fs.access(UPLOAD_DIR);
  } catch {
    await fs.mkdir(UPLOAD_DIR, { recursive: true });
  }
})();

// Multer disk storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, UPLOAD_DIR),
    filename: (req, file, cb) => {
      const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const ext = path.extname(file.originalname) || '.pdf';
      cb(null, `${unique}${ext}`);
    }
  });

  const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 15 MB limit
    fileFilter: (req, file, cb) => {
      // Only allow PDF files
      if (file.mimetype !== 'application/pdf') {
        return cb(new Error('Only PDF files are allowed'));
      }
      cb(null, true);
    }
  });

  // POST route
router.post('/', upload.single('file'), async (req, res, next) => {
    let tempPath;
    try {
      const title = (req.body.title || '').toString().trim().slice(0, 200);
      let text = req.body.text ? req.body.text.toString() : null;
      let contentType = 'text';
      let source = null;
  
      if (req.file) {
        tempPath = req.file.path;
  
        // Verify file starts with "%PDF-" magic bytes
        const head = await fs.readFile(tempPath, { encoding: 'utf8', flag: 'r' })
          .then(buf => buf.slice(0, 5))
          .catch(() => null);
        
        if (!head || !head.startsWith('%PDF')) {
          await fs.unlink(tempPath).catch(() => {});
          return res.status(400).json({ error: 'Uploaded file is not a valid PDF' });
        }

         // Parse PDF from file path
      const pdfBuffer = await fs.readFile(tempPath);
      const pdfData = await pdfParse(pdfBuffer);
      text = pdfData.text ? pdfData.text.trim() : '';
      contentType = 'pdf';
      source = req.file.originalname;
    }

    if (!text || !text.trim()) {
        if (tempPath) await fs.unlink(tempPath).catch(() => {});
        return res.status(400).json({ error: 'Content text is required' });
      }
  
      // Create content doc (removed status field - not in model)
      const contentDoc = await Content.create({
        text: text.trim(),
        contentType,
        source,
        title: title || 'Untitled',
        summary: null,
        summaryLength: null
      });

       // Generate summary asynchronously
    try {
        const summary = await generateSummary(text, 'medium');
        contentDoc.summary = summary;
        contentDoc.summaryLength = 'medium';
        await contentDoc.save();
      } catch (err) {
        console.warn('Summary generation error:', err.message);
        // Content is still saved without summary
      }
  
      // Cleanup temp file after processing
      if (tempPath) await fs.unlink(tempPath).catch(() => {});
  
      return res.status(201).json({
        contentId: contentDoc._id,
        contentType,
        title: contentDoc.title,
        summary: contentDoc.summary
      });
    } catch (err) {
      // Try cleanup on error
      if (tempPath) await fs.unlink(tempPath).catch(() => {});
      next(err);
    }
});

module.exports = router;