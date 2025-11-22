// Fungsi untuk memformat angka menjadi format Rupiah (e.g., Rp1.234.567)
function formatRupiah(number) {
    var reverse = number.toString().split('').reverse().join(''),
        ribuan = reverse.match(/\d{1,3}/g);
    ribuan = ribuan.join('.').split('').reverse().join('');
    return 'Rp' + ribuan;
}

// Fungsi baru untuk menghitung dan menampilkan Total Gaji
function calculateTotalSalary() {
    var tableBody = document.getElementById("salaryBody");
    var rows = tableBody.getElementsByTagName("tr");

    for (var i = 0; i < rows.length; i++) {
        var row = rows[i];
        
        // Ambil nilai dari atribut data-value
        var gajiCoin = parseInt(row.querySelector('td:nth-child(4)').getAttribute('data-value'));
        var gajiDiamond = parseInt(row.querySelector('td:nth-child(5)').getAttribute('data-value'));
        var bonus = parseInt(row.querySelector('td:nth-child(6)').getAttribute('data-value'));
        
        var total = gajiCoin + gajiDiamond + bonus;

        // Kolom Total Gaji adalah kolom ke-7 (index 6, jika dimulai dari 0)
        var totalCell = row.querySelector('td:nth-child(7)');
        
        // Pastikan kolom total ada, lalu isi dengan hasil yang diformat
        if (totalCell) {
            totalCell.innerHTML = formatRupiah(total);
        }
    }
}

// Fungsi filter yang sudah ada, kini memanggil calculateTotalSalary()
function filterTable() {
    var input, filter, table, tr, td, i, j, txtValue;
    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("salaryTable");
    tr = table.getElementsByTagName("tr");

    for (i = 1; i < tr.length; i++) {
        tr[i].style.display = "none";
        
        // Mulai dari kolom 1 sampai kolom 7 (termasuk Total Gaji)
        td = tr[i].getElementsByTagName("td");
        for (j = 0; j < td.length; j++) {
            if (td[j]) {
                // Gunakan teks tampilan (termasuk Total Gaji yang sudah diformat)
                txtValue = td[j].textContent || td[j].innerText;
                
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                    break;
                }
            }
        }
    }
}

// Panggil fungsi perhitungan saat halaman dimuat (event DOMContentLoaded)
document.addEventListener('DOMContentLoaded', calculateTotalSalary);