
const buttons = [
  "cmd_sign_out",
  "cmd_close_all",
  "cmd_open_ext",
  "cmd_close_unused",
  "cmd_open_tabs",
  "cmd_sign_in",
  "cmd_open_stadium",
  "cmd_bet_confirm"
];

buttons.forEach(id => {
  const btn = document.getElementById(id);
  if (btn) {
    btn.addEventListener("click", () => {
      console.log("📤 Изпращане на команда:", id);
      window.postMessage({ action: id }, "*");
    });
  }
});

// 🎯 Find Event (специален бутон с данни)
document.getElementById("btn_find_event")?.addEventListener("click", () => {
  const data = {
    action: "find_event",
    name: document.getElementById("event_name")?.value,
    date: document.getElementById("event_date")?.value,
    time: document.getElementById("event_time")?.value,
    sport: document.getElementById("event_sport")?.value,
  };
  console.log("📤 Изпращане на Find Event:", data);
  window.postMessage(data, "*");
});
