import { PriceCategory, PrinterBrandInfo, ShopProfile, CustomerOrder } from '../types';

export const defaultShopProfile: ShopProfile = {
  name: 'Digital Printing Express',
  tagline: 'Layanan Cetak Dokumen, Foto, Undangan & Stiker Cepat Berkualitas',
  phone: '081234567890',
  address: 'Jl. Percetakan Raya No. 88, Pusat Usaha Cetak',
  socialMedia: '@digitalprinting_id',
};

// DATA DAFTAR HARGA: A. (DALAM 1 MENU TERDAPAT SUB MENU)
export const initialPriceCategories: PriceCategory[] = [
  {
    id: 'print_dokumen',
    menuNumber: 1,
    title: 'PRINT DOKUMEN',
    iconName: 'FileText',
    badge: 'Populer',
    subCategories: [
      {
        id: 'print_full_color_a4',
        title: 'Print full color A4',
        description: 'Cetak dokumen berwarna tajam menggunakan kertas pilihan',
        options: [
          {
            id: 'pfc_a4_teks_warna',
            name: 'A4 Color Ringan (Teks & Logo)',
            price: 1500,
            unit: 'lembar',
            description: 'Cocok untuk tugas kuliah, kop surat, makalah',
            recommendedPrinter: 'Canon'
          },
          {
            id: 'pfc_a4_full_gambar',
            name: 'A4 Color Penuh / Full Gambar',
            price: 2500,
            unit: 'lembar',
            description: 'Cakupan warna >50%, poster, sertifikat, modul bergambar',
            recommendedPrinter: 'Epson'
          },
          {
            id: 'pfc_a4_art_paper',
            name: 'A4 Art Paper 150gr Glossy Full Color',
            price: 4000,
            unit: 'lembar',
            description: 'Kertas licin mengkilap untuk brosur & sertifikat premium',
            recommendedPrinter: 'Epson'
          },
          {
            id: 'pfc_f4_color',
            name: 'F4 / Folio Color',
            price: 2500,
            unit: 'lembar',
            description: 'Ukuran folio HVS 70/80gr warna',
            recommendedPrinter: 'Canon'
          }
        ]
      },
      {
        id: 'print_bw',
        title: 'Print BW (Hitam Putih)',
        description: 'Cetak dokumen hitam putih hemat & presisi tinggi',
        options: [
          {
            id: 'pbw_a4_hvs70',
            name: 'Print BW A4 HVS 70gr',
            price: 500,
            unit: 'lembar',
            description: 'Cetak standar skripsi, tugas, arsip kantor',
            recommendedPrinter: 'Canon'
          },
          {
            id: 'pbw_a4_hvs80',
            name: 'Print BW A4 HVS 80gr',
            price: 750,
            unit: 'lembar',
            description: 'Kertas lebih tebal & tidak mudah tembus pandang',
            recommendedPrinter: 'Canon'
          },
          {
            id: 'pbw_f4_folio',
            name: 'Print BW Folio / F4 70gr',
            price: 600,
            unit: 'lembar',
            description: 'Ukuran 21.5 x 33 cm standar perkantoran',
            recommendedPrinter: 'Canon'
          },
          {
            id: 'pbw_bolak_balik',
            name: 'Print BW A4 Bolak-Balik (2 Sisi)',
            price: 800,
            unit: 'lembar',
            description: 'Hemat kertas untuk buku / handbook',
            recommendedPrinter: 'Canon'
          }
        ]
      }
    ]
  },
  {
    id: 'cetak_foto',
    menuNumber: 2,
    title: 'CETAK FOTO',
    iconName: 'Image',
    badge: 'High Res',
    subCategories: [
      {
        id: 'foto_polaroid',
        title: 'POLAROID',
        description: 'Cetak foto gaya instan polaroid kekinian & tahan pudar',
        options: [
          {
            id: 'pol_satuan',
            name: 'Polaroid Satuan (Ukuran 2R / 6x9 cm)',
            price: 1000,
            unit: 'foto',
            description: 'Kertas Silky / Glossy Photo Paper 230gr',
            recommendedPrinter: 'Epson'
          },
          {
            id: 'pol_paket_25',
            name: 'Paket Polaroid 25 Pcs',
            price: 20000,
            unit: 'paket',
            description: 'Hemat Rp 5.000 + free packaging mika',
            recommendedPrinter: 'Epson'
          },
          {
            id: 'pol_paket_50',
            name: 'Paket Polaroid 50 Pcs',
            price: 35000,
            unit: 'paket',
            description: 'Sangat cocok untuk dekorasi kamar / photocard kpop',
            recommendedPrinter: 'Epson'
          },
          {
            id: 'pol_custom_frame',
            name: 'Polaroid Custom Frame / Warna / Teks',
            price: 1500,
            unit: 'foto',
            description: 'Frame background warna pastel / motif aesthetic',
            recommendedPrinter: 'Epson'
          }
        ]
      },
      {
        id: 'foto_standar_r',
        title: '2R / 4R / 5R / 10R',
        description: 'Ukuran foto bingkai standar lab foto kualitas maksimal',
        options: [
          {
            id: 'foto_2r',
            name: 'Cetak Foto 2R (6 x 9 cm)',
            price: 1000,
            unit: 'lembar',
            description: 'Ukuran dompet / id card',
            recommendedPrinter: 'Epson'
          },
          {
            id: 'foto_4r',
            name: 'Cetak Foto 4R (10 x 15 cm)',
            price: 2500,
            unit: 'lembar',
            description: 'Ukuran standar album kenangan keluarga',
            recommendedPrinter: 'Epson'
          },
          {
            id: 'foto_5r',
            name: 'Cetak Foto 5R (13 x 18 cm)',
            price: 5000,
            unit: 'lembar',
            description: 'Ukuran meja / pigura portrait',
            recommendedPrinter: 'Epson'
          },
          {
            id: 'foto_10r',
            name: 'Cetak Foto 10R (20 x 25 cm)',
            price: 15000,
            unit: 'lembar',
            description: 'Foto wisuda, keluarga, pajangan dinding',
            recommendedPrinter: 'Epson'
          },
          {
            id: 'foto_10r_plus',
            name: 'Cetak Foto 10R Jumbo / A4 Glossy',
            price: 18000,
            unit: 'lembar',
            description: 'Ukuran 21 x 30 cm kertas High Glossy 260gr',
            recommendedPrinter: 'Epson'
          }
        ]
      }
    ]
  },
  {
    id: 'nota',
    menuNumber: 3,
    title: 'NOTA',
    iconName: 'Receipt',
    badge: 'Bisnis',
    subCategories: [
      {
        id: 'nota_rangkap_2',
        title: 'Rangkap 2 (2 Ply NCR)',
        description: 'Kertas tembus tanpa karbon, isi 50 set (100 lembar)',
        options: [
          {
            id: 'nota_2ply_1_4',
            name: 'Nota 2 Ply Ukuran 1/4 Folio (10x16cm)',
            price: 12000,
            unit: 'buku',
            description: 'Ukuran kasir toko, warung, laundry. 50 transaksi',
            recommendedPrinter: 'Canon'
          },
          {
            id: 'nota_2ply_1_2',
            name: 'Nota 2 Ply Ukuran 1/2 Folio (16x21cm)',
            price: 22000,
            unit: 'buku',
            description: 'Ukuran surat jalan, tanda terima barang',
            recommendedPrinter: 'Canon'
          },
          {
            id: 'nota_2ply_1_rim',
            name: 'Paket Cetak Nota 2 Ply (1 Rim Komplit)',
            price: 140000,
            unit: 'paket rim',
            description: 'Jadi 40 buku (1/4) atau 20 buku (1/2) + Nomerator & Porporasi',
            recommendedPrinter: 'Both'
          }
        ]
      },
      {
        id: 'nota_rangkap_3',
        title: 'Rangkap 3 (3 Ply NCR)',
        description: 'Kertas tembus 3 lapis (Putih, Merah/Pink, Kuning/Biru)',
        options: [
          {
            id: 'nota_3ply_1_4',
            name: 'Nota 3 Ply Ukuran 1/4 Folio',
            price: 16000,
            unit: 'buku',
            description: 'Untuk pembeli, kasir, dan arsip gudang / akuntansi',
            recommendedPrinter: 'Canon'
          },
          {
            id: 'nota_3ply_1_2',
            name: 'Nota 3 Ply Ukuran 1/2 Folio',
            price: 28000,
            unit: 'buku',
            description: 'Faktur penjualan lengkap & PO resmi',
            recommendedPrinter: 'Canon'
          },
          {
            id: 'nota_3ply_1_rim',
            name: 'Paket Cetak Nota 3 Ply (1 Rim Komplit)',
            price: 185000,
            unit: 'paket rim',
            description: 'Jadi 40 buku (1/4) atau 20 buku (1/2) siap pakai',
            recommendedPrinter: 'Both'
          }
        ]
      }
    ]
  },
  {
    id: 'laminating',
    menuNumber: 4,
    title: 'LAMINATING',
    iconName: 'Layers',
    badge: 'Proteksi',
    subCategories: [
      {
        id: 'laminating_a5_a4',
        title: 'Laminating A5 / A4',
        description: 'Lapisan mika anti air, kaku dan tahan lama',
        options: [
          {
            id: 'lam_ktp_card',
            name: 'Laminating Press KTP / ID Card / SIM',
            price: 2000,
            unit: 'lembar',
            description: 'Mika press panas tebal 250 micron',
            recommendedPrinter: 'Both'
          },
          {
            id: 'lam_a5',
            name: 'Laminating A5 Panas (Glossy Kaku)',
            price: 3000,
            unit: 'lembar',
            description: 'Untuk sertifikat kecil, menu meja, kartu garansi',
            recommendedPrinter: 'Both'
          },
          {
            id: 'lam_a4',
            name: 'Laminating A4 Panas Kaku (100 micron)',
            price: 5000,
            unit: 'lembar',
            description: 'Ijazah, akta, sertifikat, piagam penghargaan',
            recommendedPrinter: 'Both'
          },
          {
            id: 'lam_f4',
            name: 'Laminating F4 / Folio Panas Kaku',
            price: 6000,
            unit: 'lembar',
            description: 'Dokumen ukuran folio legal',
            recommendedPrinter: 'Both'
          },
          {
            id: 'lam_dingin_doff_a4',
            name: 'Laminasi Dingin Doff / Glossy A4',
            price: 4000,
            unit: 'lembar',
            description: 'Stiker pelindung doff elegan tidak kaku untuk foto/stiker',
            recommendedPrinter: 'Both'
          }
        ]
      }
    ]
  },
  {
    id: 'fotocopy',
    menuNumber: 5,
    title: 'FOTOCOPY',
    iconName: 'Copy',
    badge: 'Cepat',
    subCategories: [
      {
        id: 'fc_ktp',
        title: 'KTP',
        description: 'Fotocopy identitas KTP / SIM / Kartu Keluarga rapi dan presisi',
        options: [
          {
            id: 'fc_ktp_bolak_balik',
            name: 'FC KTP Bolak-Balik (1 Lembar Jadi 1)',
            price: 500,
            unit: 'lembar',
            description: 'Depan belakang presisi di tengah kertas',
            recommendedPrinter: 'Canon'
          },
          {
            id: 'fc_ktp_berjajar',
            name: 'FC KTP Berjajar Banyak (1 Lembar Isi 4 - 8 KTP)',
            price: 1000,
            unit: 'lembar',
            description: 'Praktis untuk berkas lamaran / pendaftaran massal',
            recommendedPrinter: 'Canon'
          },
          {
            id: 'fc_kk_bpjs',
            name: 'FC Kartu Keluarga (KK) / Akta F4',
            price: 500,
            unit: 'lembar',
            description: 'Kertas HVS 70gr bersih tanpa noda toner',
            recommendedPrinter: 'Canon'
          }
        ]
      },
      {
        id: 'fc_dokumen_a4',
        title: 'DOKUMEN A4',
        description: 'Penggandaan berkas dokumen lembaran dan buku',
        options: [
          {
            id: 'fc_a4_1_sisi',
            name: 'Fotocopy A4 1 Sisi (Satuan)',
            price: 300,
            unit: 'lembar',
            description: 'Kertas HVS 70gr putih bersih',
            recommendedPrinter: 'Canon'
          },
          {
            id: 'fc_a4_bolak_balik',
            name: 'Fotocopy A4 Bolak-Balik (2 Sisi)',
            price: 500,
            unit: 'lembar',
            description: 'Hemat kertas untuk materi kuliah / training',
            recommendedPrinter: 'Canon'
          },
          {
            id: 'fc_f4_folio',
            name: 'Fotocopy F4 / Folio 70gr',
            price: 350,
            unit: 'lembar',
            description: 'Ukuran folio standar kantor',
            recommendedPrinter: 'Canon'
          },
          {
            id: 'fc_buku_grosir',
            name: 'Fotocopy Borongan (>100 lembar)',
            price: 250,
            unit: 'lembar',
            description: 'Harga hemat untuk buku, modul ajar, materi seminar',
            recommendedPrinter: 'Canon'
          }
        ]
      }
    ]
  },
  {
    id: 'cetak_undangan',
    menuNumber: 6,
    title: 'CETAK UNDANGAN',
    iconName: 'MailCheck',
    badge: 'Custom',
    subCategories: [
      {
        id: 'undangan_walimah',
        title: 'WALIMAH',
        description: 'Undangan tasyakuran walimatul ursy, walimatul khitan & aqiqah',
        options: [
          {
            id: 'und_walimah_kertas_bc',
            name: 'Undangan Walimah Kertas BC (Lipat 2)',
            price: 1000,
            unit: 'pcs',
            description: 'Ekonomis, sudah termasuk plastik OPP & label nama (min 50 pcs)',
            recommendedPrinter: 'Canon'
          },
          {
            id: 'und_walimah_art_paper',
            name: 'Undangan Walimah Art Paper 210gr Full Color',
            price: 1500,
            unit: 'pcs',
            description: 'Mengkilap elegan, desain custom foto keluarga',
            recommendedPrinter: 'Epson'
          },
          {
            id: 'und_walimah_safar_aqiqah',
            name: 'Undangan Walimatus Safar / Tasmiyah Aqiqah',
            price: 1200,
            unit: 'pcs',
            description: 'Ukuran 1/3 A4 praktis dengan doa & denah',
            recommendedPrinter: 'Epson'
          }
        ]
      },
      {
        id: 'undangan_nikah_full_color',
        title: 'NIKAH FULL COLOR',
        description: 'Undangan pernikahan modern eksklusif warna memukau',
        options: [
          {
            id: 'und_nikah_softcover_260',
            name: 'Undangan Softcover Art Carton 260gr Lipat 2',
            price: 2500,
            unit: 'pcs',
            description: 'Full Color 2 sisi + Laminasi Doff/Glossy + Plastik + Denah QR',
            recommendedPrinter: 'Epson'
          },
          {
            id: 'und_nikah_single_board',
            name: 'Undangan Single Board Floral Premium (Board 30)',
            price: 3500,
            unit: 'pcs',
            description: 'Kertas tebal mewah, tali rami aesthetic, amplop kalkir',
            recommendedPrinter: 'Epson'
          },
          {
            id: 'und_nikah_hardcover_amplop',
            name: 'Undangan Hardcover + Amplop Eksklusif',
            price: 6000,
            unit: 'pcs',
            description: 'Tebal papan rigid, foil emas nama mempelai (Hot Print Gold)',
            recommendedPrinter: 'Epson'
          }
        ]
      },
      {
        id: 'undangan_ultah',
        title: 'ULTAH',
        description: 'Undangan ulang tahun anak ceria dan sweet seventeen',
        options: [
          {
            id: 'und_ultah_karakter_anak',
            name: 'Kartu Undangan Karakter Anak (A6 Glossy)',
            price: 1500,
            unit: 'pcs',
            description: 'Tema kartun/superhero custom foto anak + plastik klip',
            recommendedPrinter: 'Epson'
          },
          {
            id: 'und_ultah_sweet17',
            name: 'Undangan Sweet 17th Card Mewah Lipat',
            price: 2500,
            unit: 'pcs',
            description: 'Desain elegan gold/black/pastel glitter effect',
            recommendedPrinter: 'Epson'
          }
        ]
      }
    ]
  },
  {
    id: 'jilid_spiral',
    menuNumber: 7,
    title: 'JILID SPIRAL',
    iconName: 'BookOpen',
    badge: 'Finishing',
    subCategories: [
      {
        id: 'jilid_custom',
        title: 'JILID CUSTOM',
        description: 'Jilid spiral kawat besi & plastik rapi dengan aneka cover',
        options: [
          {
            id: 'jilid_spiral_kawat_tipis',
            name: 'Jilid Spiral Kawat No. 4-6 (Tipis: 1-50 lembar)',
            price: 7000,
            unit: 'buku',
            description: 'Termasuk Cover Mika Transparan Depan + Buffalo Belakang',
            recommendedPrinter: 'Both'
          },
          {
            id: 'jilid_spiral_kawat_sedang',
            name: 'Jilid Spiral Kawat No. 7-10 (Sedang: 51-120 lembar)',
            price: 12000,
            unit: 'buku',
            description: 'Kawat besi kokoh anti karat + mika tebal',
            recommendedPrinter: 'Both'
          },
          {
            id: 'jilid_spiral_kawat_tebal',
            name: 'Jilid Spiral Kawat No. 12-16 (Tebal: 121-250 lembar)',
            price: 18000,
            unit: 'buku',
            description: 'Untuk katalog, modul tahunan, portofolio tebal',
            recommendedPrinter: 'Both'
          },
          {
            id: 'jilid_spiral_plastik',
            name: 'Jilid Ring Spiral Plastik (Semua Ukuran)',
            price: 6000,
            unit: 'buku',
            description: 'Mudah dibuka kembali bila ada halaman susulan',
            recommendedPrinter: 'Both'
          },
          {
            id: 'jilid_custom_hardcover_spiral',
            name: 'Jilid Custom Kalender Meja / Agenda Spiral',
            price: 20000,
            unit: 'buku',
            description: 'Dudukan board tebal laminasi doff premium',
            recommendedPrinter: 'Both'
          }
        ]
      }
    ]
  },
  {
    id: 'cetak_stiker',
    menuNumber: 8,
    title: 'CETAK STIKER',
    iconName: 'Sticker',
    badge: 'Best Seller',
    subCategories: [
      {
        id: 'stiker_folio_a4',
        title: '1 LEMBAR FOLIO / A4',
        description: 'Cetak stiker per lembar plano untuk label makanan, kemasan, & merchandise',
        options: [
          {
            id: 'stiker_chromo_a4',
            name: 'Stiker Chromo / Bontax A4 / Folio',
            price: 6000,
            unit: 'lembar',
            description: 'Kertas stiker mengkilap, perekat kuat, ekonomis untuk label toples',
            recommendedPrinter: 'Canon'
          },
          {
            id: 'stiker_vinyl_anti_air',
            name: 'Stiker Vinyl Putih Glossy Anti Air (Waterproof)',
            price: 10000,
            unit: 'lembar',
            description: 'Bahan plastik sintetis tidak robek, tahan air & beku (frozen food)',
            recommendedPrinter: 'Epson'
          },
          {
            id: 'stiker_transparan',
            name: 'Stiker Transparan / Bening Anti Air',
            price: 10000,
            unit: 'lembar',
            description: 'Hasil tembus pandang estetik untuk botol minuman & kosmetik',
            recommendedPrinter: 'Epson'
          },
          {
            id: 'stiker_kraft_vintage',
            name: 'Stiker Kraft Coklat Vintage Estetik',
            price: 8000,
            unit: 'lembar',
            description: 'Tekstur kertas daur ulang coklat khas kopi & bakery',
            recommendedPrinter: 'Canon'
          }
        ]
      },
      {
        id: 'cutting_stiker',
        title: 'CUTTING STIKER',
        description: 'Jasa potong mesin presisi otomatis siap kelupas & pakai',
        options: [
          {
            id: 'cut_kiss_cut',
            name: 'Jasa Kiss Cut (Potong Setengah Tembus / Siap Kopek)',
            price: 3000,
            unit: 'lembar',
            description: 'Stiker tinggal dikelupas dari lembaran, pola bulat/kotak/custom shape',
            recommendedPrinter: 'Both'
          },
          {
            id: 'cut_die_cut',
            name: 'Jasa Die Cut (Potong Putus Sampai Belakang)',
            price: 5000,
            unit: 'lembar',
            description: 'Potong putus per biji stiker, cocok untuk bonus olshop & merchandise',
            recommendedPrinter: 'Both'
          },
          {
            id: 'cut_paket_lengkap_vinyl_kisscut',
            name: 'Paket Komplit: Cetak Vinyl A4 + Kiss Cut Siap Pakai',
            price: 13000,
            unit: 'lembar',
            description: 'Cetak tajam full color + cutting pola bebas (bisa dapat 30-70 pcs)',
            recommendedPrinter: 'Epson'
          }
        ]
      }
    ]
  }
];

// DATA B: SETTING PRINT / CETAK (DALAM 1 MENU TERDAPAT SUB MENU)
// - PRINTER CANON
// - PRINTER EPSON
export const printerBrandData: PrinterBrandInfo[] = [
  {
    brand: 'Canon',
    fullName: 'Setting Printer Canon (Pixma Series: G1010, G2010, G2020, MP287, E410, dll)',
    recommendedModels: ['Canon G1010 / G2010 / G2020', 'Canon Pixma MP287 / IP2770', 'Canon G3010 Wireless', 'Canon TS207'],
    primaryCharacteristics: [
      'Sangat cepat untuk dokumen teks Black & White dan kop surat warna.',
      'Head cartridge tipe thermal: hasil cetak teks tajam dan presisi.',
      'Sangat cocok untuk: Print Dokumen A4, Fotocopy KTP, Nota NCR, dan Stiker Chromo/Bontax.'
    ],
    presets: [
      {
        id: 'canon_doc_fast',
        title: 'Print Dokumen Teks & Skripsi (Cepat & Hemat)',
        targetProduct: 'Print BW & Teks Dokumen',
        paperType: 'Plain Paper (Kertas Biasa)',
        printQuality: 'Standard (atau Fast/Draft untuk arsip)',
        colorMode: 'Grayscale (Ceklis kotak Grayscale)',
        paperSource: 'Rear Tray (Baki Belakang)',
        recommendedDpi: '600 x 600 DPI',
        notes: [
          'Pada driver Canon: Buka Tab "Main" -> Centang opsi "Grayscale Printing".',
          'Pilih Print Quality "Standard" agar hasil hitam pekat dan huruf tidak pecah.',
          'Pastikan tuas penahan kertas di baki belakang pas dengan lebar A4 agar tidak miring.'
        ]
      },
      {
        id: 'canon_color_doc',
        title: 'Print Warna Makalah / Logo / Kop Surat',
        targetProduct: 'Print Full Color A4 Dokumen',
        paperType: 'Plain Paper / High Resolution Paper',
        printQuality: 'High (Kualitas Tinggi)',
        colorMode: 'Color (Color/Intensity: Auto)',
        paperSource: 'Rear Tray',
        recommendedDpi: '1200 x 1200 DPI',
        notes: [
          'Jika gambar ingin lebih tajam pada kertas HVS, pilih Media Type: "High Resolution Paper".',
          'Biarkan tinta mengering 5 detik sebelum menumpuk lembaran berikutnya.',
          'Untuk cetak warna penuh, gunakan setelan Quality "High" agar garis halus tidak putus-putus.'
        ]
      },
      {
        id: 'canon_stiker_bontax',
        title: 'Cetak Stiker Chromo / Bontax A4 & Folio',
        targetProduct: 'Cetak Stiker 1 Lembar Folio',
        paperType: 'Matte Photo Paper / Photo Paper Plus Glossy II',
        printQuality: 'Standard / High',
        colorMode: 'Color (Manual Adjust: Brightness Normal)',
        paperSource: 'Rear Tray (Masukkan 1-3 lembar sekaligus)',
        recommendedDpi: '1200 DPI',
        notes: [
          'Jangan gunakan Plain Paper saat cetak stiker mengkilap agar tinta menyerap sempurna dan tidak luntur.',
          'Set ketebalan kertas jika ada tuas ketebalan (Envelope position bila tebal).',
          'Tunggu 1 menit setelah keluar dari printer sebelum masuk mesin cutting.'
        ]
      },
      {
        id: 'canon_nota_ncr',
        title: 'Cetak Lembaran Nota Rangkap (NCR Paper)',
        targetProduct: 'Nota Rangkap 2 / Rangkap 3',
        paperType: 'Plain Paper (Kertas Tipis)',
        printQuality: 'Fast / Standard',
        colorMode: 'Black / Grayscale',
        paperSource: 'Rear Tray (Maks 20 lembar per batch)',
        recommendedDpi: '300 - 600 DPI',
        notes: [
          'Kertas NCR relatif tipis (55gr), pastikan kertas dikipas-kipas terlebih dahulu agar tidak dobel ambil (double feed).',
          'Gunakan roller yang bersih bebas debu serbuk karbon.',
          'Cetak sisi atas (permukaan reaktif) sesuai arah lapisan NCR.'
        ]
      }
    ],
    maintenanceGuides: [
      {
        title: 'Nozzle Check Pattern (Cek Garis Buntu)',
        summary: 'Langkah pertama mendiagnosa hasil cetak garis-garis atau warna hilang pada Canon.',
        steps: [
          'Masukkan 1 lembar kertas A4 biasa di baki belakang.',
          'Buka "Devices & Printers" di Windows -> Klik kanan printer Canon -> "Printing Preferences".',
          'Klik tab "Maintenance" -> Klik tombol "Nozzle Check" -> Pilih "Print Check Pattern".',
          'Periksa kertas hasil cetak: Pastikan pola kisi-kisi hitam (PGBK) utuh tanpa garis bolong, dan bar warna Cyan, Magenta, Yellow rata sempurna.'
        ]
      },
      {
        title: 'Cleaning & Deep Cleaning Head',
        summary: 'Pembersihan sedot tinta untuk membersihkan sumbatan nozzle pada cartridge Canon.',
        steps: [
          'Pada tab Maintenance, pilih "Cleaning" untuk sumbatan ringan. Tunggu proses sekitar 1-2 menit.',
          'Cetak Nozzle Check kembali untuk verifikasi perbaikan.',
          'Jika masih bergaris parah, pilih "Deep Cleaning" (Pembersihan Tingkat Dalam). Catatan: Jangan lakukan Deep Cleaning lebih dari 2x berturut-turut untuk menjaga busa absorber pembuangan tetap awet.'
        ]
      },
      {
        title: 'Mengatasi Kertas Macet & Error 5B00 (Absorber Full)',
        summary: 'Penanganan masalah fisik dan pesan kedip lampu oranye pada printer Canon.',
        steps: [
          'Jika kertas macet (Paper Jam): Matikan printer, tarik kertas PERLAHAN searah keluarnya kertas (jangan ditarik paksa dari belakang).',
          'Error 5B00 / 1700 (Kedip 7x oranye hijau): Busa pembuangan tinta penuh. Perlu di-reset menggunakan Software Service Tool Canon v4905/v5306 dalam keadaan Service Mode.',
          'Bersihkan roller karet penarik kertas dengan kain mikrofiber lembap jika sering menarik beberapa lembar sekaligus.'
        ]
      }
    ],
    proTips: [
      'Gunakan tinta berbasis DYE untuk warna dan PIGMENT (PGBK) khusus hitam agar teks anti air.',
      'Jangan biarkan tabung tinta kosong di bawah garis batas minimum (garis segitiga bawah) agar selang tidak kemasukan udara.',
      'Ukuran Kertas F4/Folio: Buat preset ukuran "Custom Paper Size": Lebar 215.0 mm x Tinggi 330.0 mm.'
    ]
  },
  {
    brand: 'Epson',
    fullName: 'Setting Printer Epson (L-Series: L120, L3110, L3210, L805, L1800, dll)',
    recommendedModels: ['Epson EcoTank L3210 / L3110', 'Epson EcoTank L120 / L121', 'Epson L805 / L8050 (6 Warna Foto)', 'Epson L1800 / L18050 (A3+ Foto)'],
    primaryCharacteristics: [
      'Menggunakan teknologi Micro Piezo (tanpa panas): warna luar biasa akurat, tahan lama, dan awet.',
      'Pilihan utama untuk: Cetak Foto 2R-10R, Polaroid, Undangan Mewah, dan Stiker Vinyl Waterproof.',
      'Dukungan cetak foto borderless (tanpa tepi putih) pada seri L-Series tertentu.'
    ],
    presets: [
      {
        id: 'epson_photo_high',
        title: 'Cetak Foto Polaroid & Lab 2R / 4R / 5R / 10R',
        targetProduct: 'Cetak Foto & Polaroid',
        paperType: 'Epson Premium Glossy / Photo Paper Glossy',
        printQuality: 'High (Kualitas Tinggi 5760 x 1440 DPI)',
        colorMode: 'Color (Color Controls: Adobe RGB / Epson Vivid)',
        paperSource: 'Baki Belakang (Tegak Lurus)',
        recommendedDpi: '5760 x 1440 Optimized DPI',
        notes: [
          'Buka tab "Main" di driver Epson: Ubah Paper Type ke "Epson Premium Glossy".',
          'Quality: Pilih "High". Buka tab "More Options" -> Hapus centang pada "High Speed" (Cetak searah untuk hasil super tajam tanpa garis mikro).',
          'Untuk Polaroid / 4R: Aktifkan fitur "Borderless" jika ingin cetak foto penuh tanpa garis tepi.'
        ]
      },
      {
        id: 'epson_stiker_vinyl',
        title: 'Cetak Stiker Vinyl & Transparan Anti Air',
        targetProduct: 'Cetak Stiker Folio / A4',
        paperType: 'Epson Matte / Photo Paper Glossy',
        printQuality: 'High (Tinta Tebal & Merata)',
        colorMode: 'Color (Gamma 2.2 / Contrast +5)',
        paperSource: 'Baki Belakang',
        recommendedDpi: '1440 x 1440 DPI',
        notes: [
          'Gunakan media type "Epson Matte" untuk stiker vinyl bercoating agar semprotan tinta pekat dan tidak bleber.',
          'Pastikan tinta yang dipakai tipe Art Paper atau Dye UV berkualitas tinggi agar stiker tahan sinar matahari.',
          'Jika bahan licin, masukkan stiker satu per satu ke baki agar tidak slip.'
        ]
      },
      {
        id: 'epson_undangan_art_carton',
        title: 'Cetak Undangan Walimah & Nikah Full Color',
        targetProduct: 'Cetak Undangan Nikah & Walimah',
        paperType: 'Epson Matte / Ultra Glossy',
        printQuality: 'Standard ke High',
        colorMode: 'Color (Epson Standard Color)',
        paperSource: 'Baki Belakang',
        recommendedDpi: '1440 DPI',
        notes: [
          'Untuk kertas tebal (Art Carton 210-260gr, Kertas Jasmine berglitter): Beri dorongan ringan dengan tangan saat printer mulai menarik kertas.',
          'Hindari memegang area cetak sebelum tinta benar-benar kering 2-3 menit.',
          'Untuk undangan lipat dua, sesuaikan margin tengah minimal 1 cm agar tulisan tidak terkena lipatan.'
        ]
      },
      {
        id: 'epson_doc_standard',
        title: 'Cetak Dokumen Teks & Brosur Sehari-hari',
        targetProduct: 'Print Dokumen A4 / Brosur',
        paperType: 'Plain Paper',
        printQuality: 'Standard',
        colorMode: 'Color atau Black/Grayscale',
        paperSource: 'Baki Belakang',
        recommendedDpi: '720 x 720 DPI',
        notes: [
          'Centang "High Speed" (Bidirectional printing) agar proses cetak lembaran banyak berjalan 2x lebih cepat.',
          'Pilih opsi "Collate" (Urutkan) saat mencetak dokumen rangkap banyak agar tersusun rapi per rangkap.'
        ]
      }
    ],
    maintenanceGuides: [
      {
        title: 'Nozzle Check Epson (Pemeriksaan Jarum Semprot)',
        summary: 'Mendeteksi garis terputus pada Micro Piezo Head Epson.',
        steps: [
          'Siapkan 1 lembar kertas HVS A4.',
          'Buka "Printer Properties" -> Tab "Maintenance" -> Klik "Nozzle Check".',
          'Klik "Print". Lihat hasil tangga warna (Black, Yellow, Magenta, Cyan).',
          'Jika garis tangga utuh: Head dalam kondisi prima 100%. Jika ada anak tangga yang hilang/putus: Wajib lakukan Head Cleaning.'
        ]
      },
      {
        title: 'Head Cleaning & Power Ink Flushing (Pembersihan Bertenaga)',
        summary: 'Prosedur pembersihan sumbatan tinta kering atau selang masuk angin.',
        steps: [
          'Pada Tab "Maintenance", klik tombol "Head Cleaning" -> Klik "Start". Tunggu 3 menit hingga lampu power berhenti berkedip.',
          'Cetak Nozzle Check kembali. Jangan lakukan Head Cleaning lebih dari 3x berturut-turut.',
          'Jika masih ada warna yang macet total (selang kosong): Gunakan fitur "Power Cleaning" / "Power Ink Flushing" (Pastikan isi tabung tinta minimal 1/3 penuh).'
        ]
      },
      {
        title: 'Penanganan Kertas Miring & Reset Waste Ink Pad',
        summary: 'Solusi teknis error mekanik Epson L-Series.',
        steps: [
          'Jika kertas ditarik miring: Periksa apakah ada benda asing (peniti, serpihan kertas, staples) yang jatuh ke dalam lubang baki belakang.',
          'Lampu Kertas & Tinta Berkedip Bergantian (Service Required): Bantalan pembuangan tinta (Waste Ink Pad) penuh. Gunakan software resetter Epson (Epson Adjustment Program) untuk mereset "Main Pad Counter" ke 0%.'
        ]
      }
    ],
    proTips: [
      'Gunakan printer minimal 2 hari sekali untuk mencetak full color agar lubang nozzle Micro Piezo tidak mengering.',
      'Untuk foto awet 10 tahun: Lapisi dengan laminasi dingin doff atau simpan di dalam album kedap udara.',
      'Ukuran Folio / F4 pada Epson: Masuk ke User Defined Paper Size -> Lebar 215.9 mm x Tinggi 330.2 mm.'
    ]
  }
];

export const initialOrders: CustomerOrder[] = [
  {
    id: 'ord-101',
    orderNumber: 'ORD-260901',
    customerName: 'Bapak Hendra (CV Mandiri)',
    customerPhone: '081329876543',
    createdAt: '2026-09-17 14:30',
    dueDate: '2026-09-18 10:00',
    items: [
      {
        id: 'item-1',
        categoryTitle: 'NOTA',
        subCategoryTitle: 'Rangkap 2 (2 Ply NCR)',
        optionName: 'Nota 2 Ply Ukuran 1/4 Folio (10x16cm)',
        price: 12000,
        unit: 'buku',
        quantity: 10,
        customNote: 'Nomorator mulai 001, warna tinta biru reflex',
        printerTarget: 'Canon'
      },
      {
        id: 'item-2',
        categoryTitle: 'CETAK STIKER',
        subCategoryTitle: '1 LEMBAR FOLIO / A4',
        optionName: 'Stiker Chromo / Bontax A4 / Folio',
        price: 6000,
        unit: 'lembar',
        quantity: 5,
        customNote: 'Desain logo sudah ready di WA',
        printerTarget: 'Canon'
      }
    ],
    subtotal: 150000,
    discount: 5000,
    total: 145000,
    downPayment: 100000,
    status: 'proses_cetak',
    notes: 'Prioritas pagi jam 10 diambil',
    isPaid: false
  },
  {
    id: 'ord-102',
    orderNumber: 'ORD-260902',
    customerName: 'Kak Salsa (Mahasiswi)',
    customerPhone: '085712349988',
    createdAt: '2026-09-17 16:15',
    dueDate: '2026-09-17 18:00',
    items: [
      {
        id: 'item-3',
        categoryTitle: 'PRINT DOKUMEN',
        subCategoryTitle: 'Print full color A4',
        optionName: 'A4 Color Ringan (Teks & Logo)',
        price: 1500,
        unit: 'lembar',
        quantity: 12,
        customNote: 'Bab 1-3 skripsi',
        printerTarget: 'Canon'
      },
      {
        id: 'item-4',
        categoryTitle: 'JILID SPIRAL',
        subCategoryTitle: 'JILID CUSTOM',
        optionName: 'Jilid Spiral Kawat No. 4-6 (Tipis: 1-50 lembar)',
        price: 7000,
        unit: 'buku',
        quantity: 1,
        customNote: 'Cover mika bening depan, buffalo biru belakang',
        printerTarget: 'Both'
      }
    ],
    subtotal: 25000,
    discount: 0,
    total: 25000,
    downPayment: 25000,
    status: 'siap_ambil',
    notes: 'Sudah lunas via QRIS',
    isPaid: true
  }
];
