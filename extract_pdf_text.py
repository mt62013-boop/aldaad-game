import os
import pdfplumber

# مسار مجلد PDF
pdf_dir = os.path.join(os.path.dirname(__file__), 'references')
output_dir = os.path.join(os.path.dirname(__file__), 'references', 'extracted_texts')
os.makedirs(output_dir, exist_ok=True)

for filename in os.listdir(pdf_dir):
    if filename.lower().endswith('.pdf'):
        pdf_path = os.path.join(pdf_dir, filename)
        txt_path = os.path.join(output_dir, filename.replace('.pdf', '.txt'))
        print(f'استخراج النص من: {filename} ...')
        try:
            with pdfplumber.open(pdf_path) as pdf, open(txt_path, 'w', encoding='utf-8') as out:
                for page in pdf.pages:
                    text = page.extract_text()
                    if text:
                        out.write(text + '\n')
            print(f'تم حفظ النص في: {txt_path}')
        except Exception as e:
            print(f'خطأ في {filename}:', e)
print('تم الاستخراج لجميع الملفات.')
