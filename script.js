const qrCode = new QRCodeStyling({
  width: 300,
  height: 300,
  type: "svg",
  data: "",
  dotsOptions: { color: "#000000", type: "square" },
  backgroundOptions: { color: "#ffffff" }
});

qrCode.append(document.getElementById("qr-code"));

const dataInput = document.getElementById("data");
const dotColorInput = document.getElementById("dotColor");
const bgColorInput = document.getElementById("bgColor");
const dotStyleSelect = document.getElementById("dotStyle");
const imageInput = document.getElementById("imageInput");
const downloadBtn = document.getElementById("download");
const fileTypeSelect = document.getElementById("fileType");

function update() {
  qrCode.update({
    data: dataInput.value,
    dotsOptions: { color: dotColorInput.value, type: dotStyleSelect.value },
    backgroundOptions: { color: bgColorInput.value }
  });
}

dataInput.addEventListener("input", update);
dotColorInput.addEventListener("change", update);
bgColorInput.addEventListener("change", update);
dotStyleSelect.addEventListener("change", update);

imageInput.addEventListener("change", () => {
  const file = imageInput.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    qrCode.update({ image: reader.result });
  };
  reader.readAsDataURL(file);
});

downloadBtn.addEventListener("click", (e) => {
  e.preventDefault();
  qrCode.download({ name: "qr-code", extension: fileTypeSelect.value });
});

update();
