/* eslint-disable no-undef */

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import nodemailer from 'nodemailer';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Setup Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Route Default untuk Mengecek Server
app.get('/', (req, res) => {
  res.send('Server berjalan dengan baik 🚀');
});

// Route untuk Mengirim Email dari Contact Form
app.post('/send-email', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Semua field harus diisi' });
  }

  const mailOptions = {
    from: `"nusaBus" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,
    subject: 'Pesan Baru dari Pengunjung NusaBus',
    html: `
    <div style="
      font-family: Poppins, sans-serif;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      border-radius: 8px;
      background-color: #ffffff;
      border: 1px solid #e0e0e0;
    ">
      <!-- Header -->
      <div style="text-align: center; padding-bottom: 15px;">
        <h2 style="color: #28313F; margin: 0;">Nusa<span style="color: #28313F;">Bus</span></h2>
        <p style="color: black; font-size: 14px;">Pesan baru dari pengunjung website</p>
      </div>

      <hr style="border: none; height: 1px; background-color: #ddd; margin: 15px 0;">

      <!-- Main Content -->
      <h2 style="text-align: center; color: #333;">Halo, admin <span style="color: #28313F;">NusaBus!</span></h2>
      <p style="text-align: center; color: #black;">
        Kamu mendapatkan pesan baru dari form kontak di website NusaBus.
      </p>

      <!-- User Message -->
      <div style="
        background-color: #f8f9fa;
        padding: 15px;
        border-radius: 6px;
        margin-bottom: 15px;
      ">
        <p><strong>Nama:</strong> ${name}</p>
        <p><strong>Email Pengirim:</strong> ${email}</p>
        <p><strong>Pesan:</strong></p>
        <blockquote style="
          padding: 10px;
          background-color: #ffffff;
          border-left: 4px solid #007bff;
          margin: 0;
        ">
          "${message}"
        </blockquote>
      </div>

      <!-- CTA Button -->
      <div style="text-align: center; margin: 20px 0;">
        <a href="mailto:${email}" style="
          background-color: #28313F;
          color: white;
          padding: 12px 20px;
          text-decoration: none;
          border-radius: 6px;
          display: inline-block;
          font-size: 16px;
        ">
          Balas Pesan Ini
        </a>
      </div>

      <hr style="border: none; height: 1px; background-color: #ddd; margin: 15px 0;">

      <!-- Tips Section -->
      <div style="background-color: #eef5ff; padding: 15px; border-radius: 6px;">
        <p style="color: #28313F; font-weight: bold;">💡 Pro Tip:</p>
        <p style="color: #555; font-size: 14px;">
          Cek dan balas pesan lebih cepat agar pelanggan mendapatkan respon terbaik!
        </p>
      </div>

      <hr style="border: none; height: 1px; background-color: #ddd; margin: 15px 0;">

      <!-- Footer -->
      <p style="text-align: center; font-size: 12px; color: gray;">
        NusaBus | <a href="https://nusabus.com" style="color: #28313F; text-decoration: none;">Website</a>
      </p>

      <div style="text-align: center; margin-top: 10px;">
        <a href="#" style="margin: 0 5px;"><img src="https://w7.pngwing.com/pngs/258/274/png-transparent-computer-icons-instagram-black-riviera-instagram-logo-share-icon-black-instagram-thumbnail.png" alt="Instagram" width="24"></a>
        <a href="#" style="margin: 0 5px;"><img src="https://static.vecteezy.com/system/resources/previews/053/986/348/non_2x/x-twitter-icon-logo-symbol-free-png.png" alt="Twitter" width="24"></a>
        <a href="#" style="margin: 0 5px;"><img src="https://cdn-icons-png.flaticon.com/512/59/59439.png" alt="Facebook" width="24"></a>
      </div>

      <p style="text-align: center; font-size: 12px; color: gray; margin-top: 15px;">
      © 2025 NusaBus. All rights reserved.
      </p>
    </div>
  `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email berhasil dikirim:', info.response);
    res.json({ message: 'Email berhasil dikirim!' });
  } catch (error) {
    console.error('Gagal mengirim email:', error);
    res
      .status(500)
      .json({ message: 'Gagal mengirim email', error: error.toString() });
  }
});

const generateSeats = (numPassengers) => {
  const seats = [];
  const letters = ['A', 'B', 'C', 'D']; // Typical bus seat letters
  const maxRows = 20; // Assume a bus has up to 20 rows

  // Random starting row
  const startRow =
    Math.floor(Math.random() * (maxRows - numPassengers + 1)) + 1;

  if (numPassengers === 1) {
    // Single passenger: random row and letter
    const letter = letters[Math.floor(Math.random() * letters.length)];
    seats.push(`${startRow}${letter}`);
  } else if (numPassengers === 2) {
    // Two passengers: prefer side-by-side (same row, consecutive letters)
    const row = startRow;
    const letterIndex = Math.floor(Math.random() * (letters.length - 1)); // Ensure room for 2 letters
    seats.push(
      `${row}${letters[letterIndex]}`,
      `${row}${letters[letterIndex + 1]}`
    );
  } else {
    // More than 2: mix of side-by-side and front-back
    let row = startRow;
    for (let i = 0; i < numPassengers; i++) {
      if (i % 2 === 0 && i + 1 < numPassengers) {
        // Pair side-by-side
        seats.push(`${row}${letters[0]}`, `${row}${letters[1]}`);
        i++; // Skip next iteration since we added 2
      } else {
        // Single seat or odd number remainder
        seats.push(`${row}${letters[0]}`);
      }
      row++;
    }
  }

  return seats.join(' - '); // e.g., "1A - 1B" or "1A - 1B - 2A"
};

// New Route untuk Mengirim E-Ticket
app.post('/send-ticket-email', async (req, res) => {
  const {
    ordererName,
    ordererEmail,
    origin,
    destination,
    date,
    busName,
    schedule,
    arrivalTime,
    numPassengers,
    passengers,
    price,
  } = req.body;

  if (
    !ordererName ||
    !ordererEmail ||
    !origin ||
    !destination ||
    !date ||
    !busName ||
    !numPassengers ||
    !price ||
    !schedule ||
    !arrivalTime ||
    !passengers
  ) {
    return res.status(400).json({ message: 'Semua field harus diisi' });
  }

  const ticketId = `NB${Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, '0')}`;

  const mailOptions = {
    from: `"nusaBus" <${process.env.EMAIL_USER}>`,
    to: ordererEmail, // Send to the orderer, not admin
    subject: 'NusaBus E-Ticket',
    html: `
    <div style="
      font-family: Arial, Helvetica, sans-serif;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      border-radius: 8px;
      background-color: #ffffff;
      border: 1px solid #e0e0e0;
    ">
      <!-- Header -->
      <div style="text-align: center; padding-bottom: 15px;">
        <h2 style="color: #28313F; margin: 0;">Nusa<span style="color: #2B7FFF;">Bus</span></h2>
        <p style="color: black; font-size: 14px;">E-Ticket untuk Perjalanan Anda</p>
      </div>

      <hr style="border: none; height: 1px; background-color: #ddd; margin: 15px 0;">

      <!-- Main Content -->
      <h2 style="text-align: center; color: #333;">Halo, <span style="color: #2B7FFF;">${ordererName}</span>!</h2>
      <p style="text-align: center; color: #black;">
        Terima kasih telah memesan tiket di NusaBus. Berikut adalah detail perjalanan Anda:
      </p>

      <!-- Ticket Details -->
      <div style="padding: 15px; margin-bottom: 15px;">
        <table style="width: 100%; border-collapse: collapse; color: #333; font-size: 14px;">
          <tr>
            <td style="padding: 5px 0; width: 40%;">Ticket</td>
            <td style="padding: 5px 0; text-align: right;">${ticketId}</td>
          </tr>
          <tr>
            <td style="padding: 5px 0; width: 40%;">Rute</td>
            <td style="padding: 5px 0; text-align: right;">${origin} - ${destination}</td>
          </tr>
          <tr>
            <td style="padding: 5px 0; width: 40%;">Tanggal</td>
            <td style="padding: 5px 0; text-align: right;">
              ${new Date(date).toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </td>
          </tr>
          <tr>
            <td style="padding: 5px 0; width: 40%;">Bus</td>
            <td style="padding: 5px 0; text-align: right;">${busName}</td>
          </tr>
          <tr>
            <td style="padding: 5px 0; width: 40%;">Jadwal Keberangkatan</td>
            <td style="padding: 5px 0; text-align: right;">${schedule}</td>
          </tr>
          <tr>
            <td style="padding: 5px 0; width: 40%;">Sampai Tujuan</td>
            <td style="padding: 5px 0; text-align: right;">${arrivalTime}</td>
          </tr>
          <tr>
            <td style="padding: 5px 0; width: 40%;">Jumlah Penumpang</td>
            <td style="padding: 5px 0; text-align: right;">${numPassengers}</td>
          </tr>
          <tr>
            <td style="padding: 5px 0; width: 40%;">Kursi</td>
            <td style="padding: 5px 0; text-align: right;">${generateSeats(
              numPassengers
            )}</td>
          </tr>
          <tr>
            <td style="padding: 5px 0; width: 40%;">Nama Penumpang</td>
            <td style="padding: 5px 0; text-align: right; word-break: break-word;">
              ${passengers.map((p) => p.name).join(', ')}
            </td>
          </tr>
          <tr>
            <td style="padding: 5px 0; width: 40%;">Total Harga</td>
            <td style="padding: 5px 0; text-align: right;">
              IDR ${(price * numPassengers).toLocaleString('id-ID')}
            </td>
          </tr>
        </table>
      </div>

      <!-- CTA Button -->
      <div style="text-align: center; margin: 20px 0;">
        <a href="https" style="
          background-color: #28313F;
          color: white;
          padding: 12px 20px;
          text-decoration: none;
          border-radius: 6px;
          display: inline-block;
          font-size: 16px;
        ">
          Happy Travel!
        </a>
      </div>

      <hr style="border: none; height: 1px; background-color: #ddd; margin: 15px 0;">

      <!-- Tips Section -->
      <div style="background-color: #eef5ff; padding: 15px; border-radius: 6px;">
        <p style="color: #28313F; font-weight: bold;">💡 Info Penting:</p>
        <p style="color: #555; font-size: 14px;">
          Simpan e-ticket ini dan tunjukkan saat naik bus. Hubungi kami jika ada pertanyaan!
        </p>
      </div>

      <hr style="border: none; height: 1px; background-color: #ddd; margin: 15px 0;">

      <!-- Footer -->
      <p style="text-align: center; font-size: 12px; color: gray;">
        NusaBus | <a href="https://nusabus.com" style="color: #28313F; text-decoration: none;">Website</a>
      </p>

      <div style="text-align: center; margin-top: 10px;">
        <a href="#" style="margin: 0 5px;"><img src="https://w7.pngwing.com/pngs/258/274/png-transparent-computer-icons-instagram-black-riviera-instagram-logo-share-icon-black-instagram-thumbnail.png" alt="Instagram" width="24"></a>
        <a href="#" style="margin: 0 5px;"><img src="https://static.vecteezy.com/system/resources/previews/053/986/348/non_2x/x-twitter-icon-logo-symbol-free-png.png" alt="Twitter" width="24"></a>
        <a href="#" style="margin: 0 5px;"><img src="https://cdn-icons-png.flaticon.com/512/59/59439.png" alt="Facebook" width="24"></a>
      </div>

      <p style="text-align: center; font-size: 12px; color: gray; margin-top: 15px;">
        © 2025 NusaBus. All rights reserved.
      </p>
    </div>
  `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('E-Ticket berhasil dikirim:', info.response);
    res.json({ message: 'E-Ticket berhasil dikirim!' });
  } catch (error) {
    console.error('Gagal mengirim e-ticket:', error);
    res
      .status(500)
      .json({ message: 'Gagal mengirim e-ticket', error: error.toString() });
  }
});

// Jalankan Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server berjalan di http://localhost:${PORT}`)
);
