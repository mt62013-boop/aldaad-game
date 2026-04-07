// نموذج تعليقات الطالب

function loadComments() {
  const comments = JSON.parse(localStorage.getItem('tahar_comments') || '[]');
  const replies = JSON.parse(localStorage.getItem('tahar_replies') || '[]');
  const list = document.getElementById('comments-list');
  if (!list) return;
  list.innerHTML = comments.length ? '<h4>تعليقاتك السابقة:</h4>' : '';
  comments.forEach((c, i) => {
    let reply = replies[i] ? `<div class='reply-item'><b>رد المعلم:</b> ${replies[i]}</div>` : '';
    list.innerHTML += `<div class=\"comment-item\">${c}${reply}</div>`;
  });
}

window.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('comment-form');
  if (form) {
    form.onsubmit = function(e) {
      e.preventDefault();
      const val = document.getElementById('comment-input').value.trim();
      if (val) {
        let comments = JSON.parse(localStorage.getItem('tahar_comments') || '[]');
        comments.push(val);
        localStorage.setItem('tahar_comments', JSON.stringify(comments));
        document.getElementById('comment-input').value = '';
        loadComments();
      }
    };
    loadComments();
  }
});
// student.js - منطق واجهة الطالب
// مبدئي: عرض رسالة ترحيب

window.onload = async function() {
  const quizArea = document.getElementById('student-quiz-area');
  quizArea.innerHTML = '<p>جاري تحميل الأسئلة...</p>';
  try {
    const res = await fetch('questions.json');
    const questions = await res.json();
    if (!questions.length) {
      quizArea.innerHTML = '<p>لا توجد أسئلة متاحة حالياً.</p>';
      return;
    }
    let current = 0;
    showQuestion(current);

    function showQuestion(idx) {
      const q = questions[idx];
      quizArea.innerHTML = `
        <div class="question-box">
          <h3>${q.question}</h3>
          <ul class="options-list">
            ${q.options.map((opt, i) => `<li><button class="option-btn" data-idx="${i}">${opt}</button></li>`).join('')}
          </ul>
          <div class="question-meta">المجال: <b>${q.field}</b> | الفرع: <b>${q.branch}</b> | الموضوع: <b>${q.topic}</b></div>
          <div class="question-nav">
            ${idx > 0 ? '<button id="prev-btn">السابق</button>' : ''}
            ${idx < questions.length - 1 ? '<button id="next-btn">التالي</button>' : ''}
          </div>
        </div>
      `;
      document.querySelectorAll('.option-btn').forEach(btn => {
        btn.onclick = function() {
          if (btn.textContent === q.answer) {
            btn.style.background = '#228B22';
            btn.style.color = '#fff';
            btn.textContent += ' ✔';
          } else {
            btn.style.background = '#b22222';
            btn.style.color = '#fff';
            btn.textContent += ' ✖';
          }
          document.querySelectorAll('.option-btn').forEach(b => b.disabled = true);
        };
      });
      if (document.getElementById('next-btn')) {
        document.getElementById('next-btn').onclick = () => showQuestion(idx + 1);
      }
      if (document.getElementById('prev-btn')) {
        document.getElementById('prev-btn').onclick = () => showQuestion(idx - 1);
      }
    }
  } catch (e) {
    quizArea.innerHTML = '<p>تعذر تحميل الأسئلة.</p>';
  }
};
