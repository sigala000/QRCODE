const express = require('express');
const PDFDocument = require('pdfkit');
const cors = require('cors');
const fs = require('fs');
const Qrcode = require("qrcode");





const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/Attestation', async (req, res) => {
  const { name, date, matricule, compname, compnam, abbr, amt } = req.body;

  const doc = new PDFDocument();
  const fileName = 'Attestation.pdf';
  const stream = fs.createWriteStream(fileName);

  // Generate the QR code
  const qrCodeData = "https://example.com";
  const qrCodeOptions = {
    width: 100,
    height: 100,
  };
  const qrCodeDataURL = await QRCode.toDataURL(qrCodeData, qrCodeOptions);
  const qrCodeImage = await QRCode.toBuffer(qrCodeDataURL);

  // Add the QR code image to the PDF

  doc.pipe(stream);
  doc.image(qrCodeImage, {
    fit: [150, 150], // Set the width and height of the QR code in the PDF
    align: 'center', // Center the image horizontally in the PDF
    valign: 'center', // Center the image vertically in the PDF
  });

  doc.fontSize(24).text('Attestation de Dematerialisation', { align: 'center' });
  doc.fontSize(24).text('des Valeurs Mobilieres Excercice 2023', { align: 'center' });
  doc.fontSize(14).text(`${matricule} /CAA/DG/DDGAF/SDD/ ${compnam}`, { align: 'center' });
  doc.fontSize(14).text('La Caisse Autonome dAmortissement, Conservateur des Valeurs Mobilières non cotées, agissant en vertu de larticle trentième de la Loi de finances 2019',{ align: 'center' });
  doc.fontSize(14).text(`Attest que la ${compname} en abrégé ${abbr} au capital de FCFA ${amt} N°RCCM: RC/DLA/1999/B/6468, NIU: M 0779 0000 1656 A a rempli les conditions fixées par l'AVIS N°001/CAA/DC du ${date} à savoir:`,{ align: 'center' });
  doc.fontSize(14).text("1/La codification et l'inscription en compte des valeurs mobilières qu'elle a émises.", { align: 'center' });
  doc.fontSize(14).text(" 2/Le dépôt des certificats physiques d'actions collectés auprès de ses actionnaires accompagnés des autorisations de destruction;", { align: 'center' });
  doc.fontSize(14).text("3/La transmission des modalités de tenue des comptes titres (copie de la convention de mandat signée avec une société de bourse agrée ou descriptif du logiciel de gestion titres acquis);", { align: 'center' });
  doc.fontSize(14).text("4/La transmission des extraits de compte générés au 31 décembre 2022 (Attestation de propriété, compte global d'émission, journal général des opérations, historique compte de chaque actionnaire, Tableau de suivi des actions en déshérence);", { align: 'center' });
  doc.fontSize(14).text("5/La transmission du registre des titres nominatifs à date;", { align: 'center' })
  doc.fontSize(14).text("6/Le règlement des commissions dues à la CAA (codification et inscription en compte. Opérations sur titres, Droit de garde annuel 2023)", { align: 'center' })
  doc.fontSize(45).text("Code adhérent : 5181", { align: 'center' });
  doc.fontSize(14).text(`Valeur: Action ${abbr}`, { align: 'center' });
  doc.fontSize(14).text('Code valeur (ISIN): CM 000 005181-3');
  doc.fontSize(14).text('Quantité titres collectés : 350 000 /350 000');
  doc.fontSize(14).text(`Teneur de comptes titres : ${compname}`);
  doc.fontSize(14).text('des Valeurs Mobilieres Excercice 2023');
  // doc.fontSize(16).text(`Name: ${name}`);
  // doc.fontSize(16).text(`Date: ${date}`);
  // doc.fontSize(16).text(`Date: ${matricule}`);
  doc.fontSize(14).text('En foi de quoi la présente attestation de dématérialisation, valable pour lannée 2023, lui est délivrée pour servir et valoir ce que de droit');

  doc.end();
  stream.on('finish', () => {
    res.setHeader('Content-Type', 'application/pdf');
    res.download(fileName);
  });
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
