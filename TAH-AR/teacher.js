// teacher.js - منطق واجهة المعلم
// مبدئي: عرض رسالة عند الضغط على الأزرار


document.querySelectorAll('.icon-btn').forEach(btn => {
  btn.addEventListener('click', e => {
    alert('هذه الوظيفة ستُفعّل لاحقًا: ' + e.target.textContent);
  });
});

// عرض تعليقات الطلاب (محلي فقط)

function loadTeacherComments() {
  const list = document.getElementById('teacher-comments-list');
  const repliesList = document.getElementById('teacher-replies-list');
  if (!list) return;
  const comments = JSON.parse(localStorage.getItem('tahar_comments') || '[]');
  const replies = JSON.parse(localStorage.getItem('tahar_replies') || '[]');
  list.innerHTML = comments.length ? '' : '<em>لا توجد تعليقات بعد.</em>';
  comments.forEach((c, i) => {
    let reply = replies[i] ? `<div class='reply-item'><b>رد المعلم:</b> ${replies[i]}</div>` : '';
    list.innerHTML += `<div class=\"comment-item\"><b>طالب ${i+1}:</b> ${c}${reply}</div>`;
  });
  // عرض ملخص الردود أسفل النموذج
  if (repliesList) {
    repliesList.innerHTML = replies.filter(r => r).length ? '<h4>ردودك السابقة:</h4>' : '';
    replies.forEach((r, i) => {
      if (r) repliesList.innerHTML += `<div class='reply-item'><b>رد على تعليق ${i+1}:</b> ${r}</div>`;
    });
  }
}

window.addEventListener('DOMContentLoaded', function() {
  loadTeacherComments();
  const replyForm = document.getElementById('reply-form');
  if (replyForm) {
    replyForm.onsubmit = function(e) {
      e.preventDefault();
      const idx = parseInt(document.getElementById('reply-index').value, 10) - 1;
      const val = document.getElementById('reply-input').value.trim();
      let replies = JSON.parse(localStorage.getItem('tahar_replies') || '[]');
      let comments = JSON.parse(localStorage.getItem('tahar_comments') || '[]');
      if (val && idx >= 0 && idx < comments.length) {
        replies[idx] = val;
        localStorage.setItem('tahar_replies', JSON.stringify(replies));
        document.getElementById('reply-input').value = '';
        loadTeacherComments();
      } else {
        alert('يرجى إدخال رقم تعليق صحيح وكتابة الرد.');
      }
    };
  }
});
