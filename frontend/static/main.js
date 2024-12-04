const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const captureButton = document.getElementById("capture");
const statusDiv = document.getElementById("status");
const resultsDiv = document.getElementById("results");

let stream = null;


startButton.addEventListener("click", () => {
    navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((mediaStream) => {
            stream = mediaStream;
            video.srcObject = stream;
            statusDiv.textContent = "Camera đã bật. Bắt đầu nhận diện...";
            startButton.disabled = true;
            stopButton.disabled = false;
            captureButton.disabled = false;
        })
        .catch((error) => {
            statusDiv.textContent = "Không thể truy cập camera. Vui lòng kiểm tra cài đặt.";
            console.error("Error accessing camera:", error);
        });
});


stopButton.addEventListener("click", () => {
    if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
        video.srcObject = null;
        statusDiv.textContent = "Camera đã tắt.";
        startButton.disabled = false;
        stopButton.disabled = true;
        captureButton.disabled = true;
    }
});

// 
captureButton.addEventListener("click", () => {
    const context = canvas.getContext("2d");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // 
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = canvas.toDataURL("image/png");

    statusDiv.textContent = "Đang xử lý ảnh...";

    //
    fetch("http://127.0.0.1:8000/api/recognize", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ img: imageData, group: Option }),
        })
        .then(response => response.json())
        .then(data => {
            alert('Ảnh đã được gửi đi!');
        })
        .catch(err => {
            console.error('Lỗi gửi ảnh:', err);
        });


    // .then((response) => response.json())
    // .then((data) => {
    //     if (data.success) {
    //         statusDiv.textContent = "Nhận diện thành công!";
    //         resultsDiv.innerHTML = data.results
    //             .map((result) => `<p>${result.name}: ${result.status}</p>`)
    //             .join("");
    //     } else {
    //         statusDiv.textContent = "Nhận diện thất bại. Vui lòng thử lại.";
    //     }
    // })
    // .catch((error) => {
    //     statusDiv.textContent = "Lỗi kết nối đến máy chủ.";
    //     console.error("Error:", error);
    // });
});



// document.getElementById("loginButton").onclick = function() {
//     window.location.href = "login";

// };
const dropdown = document.querySelector('.dropdown-content');
const dropdownBtn = document.querySelector('.dropdown-btn');
const options = document.querySelectorAll('.dropdown-content a');


dropdownBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdown.classList.toggle('active');
});


document.addEventListener('click', () => {
    dropdown.classList.remove('active');
});


options.forEach(option => {
    option.addEventListener('click', (e) => {
        e.preventDefault();
        const selectedValue = option.textContent;
        dropdownBtn.textContent = selectedValue;
        console.log(selectedValue)
        dropdown.classList.remove('active');
        Option = selectedValue
        console.log('Tùy chọn được chọn:', Option);
    });
});
var Option;