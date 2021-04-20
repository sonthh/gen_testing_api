import { commonCSS } from './common.css';

export const mailTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>${commonCSS}</style>
</head>
<body>
<div class="body">
  <div class="content">
    <div>Xin chào {{username}},</div>
    <br>
    Bác sĩ gởi mail cho bạn
    <br>
  <div>
</div>
</body>
</html>
`;
