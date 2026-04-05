document.addEventListener("DOMContentLoaded", function () {
  var resultMap = {
    auditori: {
      title: "Kamu adalah tipe Auditori!",
      description: "Kamu lebih mudah belajar dengan mendengarkan penjelasan, diskusi, atau audio.",
      tips: [
        "Coba rekam materi lalu dengarkan kembali.",
        "Belajar lewat diskusi bisa membantu kamu lebih cepat paham.",
        "Baca materi dengan suara keras supaya lebih mudah diingat."
      ]
    },
    visual: {
      title: "Kamu adalah tipe Visual!",
      description: "Kamu lebih mudah belajar dengan gambar, diagram, warna, dan video.",
      tips: [
        "Gunakan warna atau mind map saat mencatat.",
        "Tonton video pembelajaran untuk memperjelas materi.",
        "Buat ringkasan dalam bentuk visual."
      ]
    },
    kinestetik: {
      title: "Kamu adalah tipe Kinestetik!",
      description: "Kamu lebih mudah belajar dengan praktik langsung dan pengalaman.",
      tips: [
        "Belajar sambil praktik akan lebih membantu.",
        "Gunakan alat bantu atau simulasi sederhana.",
        "Belajar bertahap sambil bergerak bisa bikin kamu lebih fokus."
      ]
    },
    kombinasi: {
      title: "Kamu punya gaya belajar kombinasi!",
      description: "Kamu cocok belajar dengan memadukan beberapa cara sekaligus.",
      tips: [
        "Gabungkan catatan visual, diskusi, dan praktik.",
        "Coba beberapa metode lalu lihat mana yang paling nyaman.",
        "Sesuaikan metode belajar dengan jenis materi."
      ]
    }
  };

  var form = document.getElementById("learning-style-form");
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      var counts = { A: 0, B: 0, C: 0 };

      for (var i = 1; i <= 10; i += 1) {
        var selected = document.querySelector('input[name="q' + i + '"]:checked');
        if (selected) {
          counts[selected.value] += 1;
        }
      }

      var resultKey = "kombinasi";

      if (counts.A > counts.B && counts.A > counts.C) {
        resultKey = "auditori";
      } else if (counts.B > counts.A && counts.B > counts.C) {
        resultKey = "visual";
      } else if (counts.C > counts.A && counts.C > counts.B) {
        resultKey = "kinestetik";
      }

      sessionStorage.setItem("learningStyleResult", JSON.stringify(resultMap[resultKey]));
      window.location.href = "result.html";
    });
  }

  var resultTitle = document.getElementById("result-title");
  var resultDescription = document.getElementById("result-description");
  var resultTips = document.getElementById("result-tips");

  if (resultTitle && resultDescription && resultTips) {
    var storedResult = sessionStorage.getItem("learningStyleResult");

    if (!storedResult) {
      return;
    }

    try {
      var activeResult = JSON.parse(storedResult);
      resultTitle.textContent = activeResult.title;
      resultDescription.textContent = activeResult.description;
      resultTips.innerHTML = activeResult.tips
        .map(function (tip) {
          return "<li>" + tip + "</li>";
        })
        .join("");
    } catch (error) {
      resultTitle.textContent = "Hasil tes kamu belum tersedia.";
      resultDescription.textContent = "Coba isi tes lagi dari halaman product.";
      resultTips.innerHTML = "<li>Masuk ke halaman product lalu isi tes terlebih dahulu.</li>";
    }
  }
});
