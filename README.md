# technicalTest-LSP-Digital-Marketing

LSP Digital Marketing Technical Test

## Konten Repository

Berikut adalah repository yang berisi Sistem Manajemen Pengguna untuk technical test LSP Digital Marketing

## Disclaimer!

Saya diberikan 5 soal total, saya sejauh ini hanya mampu mengerjakan 1 soal dari 5, hal tersebut dikarenakan membutuhkan waktu untuk menjalankan debugging

## Cara Menjalankan

### Backend

1. Git Clone repository
2. cd Sistem-Manajemen-Pengguna
3. cd backend
4. npm i / npm install
5. npx sequelize-cli db:create (initialisasi server)
6. npx sequelize-cli db:migrate (migrasi data server)
7. npx sequelize-cli db:seed:all (seeding data ke server)
8. node bin/www.js

### Frontend

1. Git Clone repository
2. cd Sistem-Manajemen-Pengguna
3. cd frontend
4. npm i / npm install
5. npm run dev

### Cara untuk menjalankan website secara keseluruhan

1. Run terlebih dahulu bagian backend
2. Setelah bagian backend telah berjalan, kemudian jalankan bagian frontend
3. Website sudah dapat berjalan

## Akun yang bisa dipakai untuk login

1. [
   name: User1
   email: user1@mail.com
   password: user1
   role: Admin
   ]
2. [
   name: User2
   email: user2@mail.com
   password: user2
   role: Staff
   ]

## Testing API menggunakan Postman

https://api.postman.com/collections/37133889-ba13cc1f-84c2-41b8-82a0-5d7c2ccd5822?access_key=PMAT-01JDM7PKWE3VT74C9KZ0DRET8
