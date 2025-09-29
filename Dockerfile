# ใช้ Node.js เวอร์ชันเบา (alpine) เพื่อลดขนาด image
FROM node:18-alpine

# กำหนด working directory
WORKDIR /app

# copy ไฟล์ package.json และ package-lock.json ก่อน
COPY package*.json ./

# ติดตั้ง dependencies (เฉพาะ production จะไม่ติดตั้ง devDependencies)
RUN npm install --production

# copy ไฟล์โปรเจคทั้งหมดเข้ามา
COPY . .

# กำหนด port ที่ container จะ expose
EXPOSE 5001

# สั่งรันโปรแกรม
CMD ["npm", "start"]
