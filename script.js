const qrCode = new QRCodeStyling({
  width: 300,
  height: 300,
  data: "https://qr-code-styling.com",
  dotsOptions: { color: "#6a1a4c", type: "extra-rounded" },
  backgroundOptions: { color: "#ffffff" }
});

qrCode.append(document.getElementById("qr-code"));

const dataInput = document.getElementById("form-data");
const widthInput = document.getElementById("form-width");
const heightInput = document.getElementById("form-height");
const marginInput = document.getElementById("form-margin");
const imageInput = document.getElementById("form-image-file");
const dotsTypeSelect = document.getElementById("form-dots-type");
const dotsColorInput = document.getElementById("form-dots-color");
const bgColorInput = document.getElementById("form-background-color");
const downloadBtn = document.getElementById("qr-download");
const extensionSelect = document.getElementById("qr-extension");
const exportBtn = document.getElementById("export-options");

let imageData = null;

function update() {
  qrCode.update({
    data: dataInput.value,
    width: parseInt(widthInput.value),
    height: parseInt(heightInput.value),
    margin: parseInt(marginInput.value),
    image: imageData,
    dotsOptions: {
      type: dotsTypeSelect.value,
      color: dotsColorInput.value
    },
    backgroundOptions: { color: bgColorInput.value }
  });
}

[dataInput, widthInput, heightInput, marginInput, dotsTypeSelect, dotsColorInput, bgColorInput]
  .forEach(el => el.addEventListener("input", update));

imageInput.addEventListener("change", () => {
  const file = imageInput.files[0];
  if (!file) {
    imageData = null;
    update();
    return;
  }
  const reader = new FileReader();
  reader.onload = () => {
    imageData = reader.result;
    update();
  };
  reader.readAsDataURL(file);
});

downloadBtn.addEventListener("click", (e) => {
  e.preventDefault();
  qrCode.download({ name: "qr-code", extension: extensionSelect.value });
});

exportBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const options = {
    data: dataInput.value,
    width: parseInt(widthInput.value),
    height: parseInt(heightInput.value),
    margin: parseInt(marginInput.value),
    dotsOptions: { type: dotsTypeSelect.value, color: dotsColorInput.value },
    backgroundOptions: { color: bgColorInput.value }
  };
  const blob = new Blob([JSON.stringify(options, null, 2)], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "qr-options.json";
  link.click();
});

update();

document.querySelectorAll(".accordion").forEach(btn => {
  btn.addEventListener("click", () => {
    btn.classList.toggle("accordion--open");
    const panel = btn.nextElementSibling;
    panel.classList.toggle("panel--open");
  });
});
