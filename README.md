# Huong dan cai dat va chay local

## 1) Mo ta nhanh
Repo nay chu yeu la cac file demo **AngularJS** dang HTML tinh (vi du: `index.html`, `hello.html`, `calculator.html`, ...), su dung thu vien tai `libs/angular.min.js`.

## 2) Yeu cau moi truong
- Trinh duyet web hien dai (Chrome, Edge, Firefox).
- (Khuyen nghi) Cai **Node.js LTS** neu ban muon chay bang local server.

## 3) Chay local

### Cach A: Chay app Angular (thu muc `src/`)
1. Clone repo:
```bash
git clone <repo-url>
cd angularjs
```
2. Cai dependency:
```bash
npm install
```
3. Chay dev server:
```bash
npm start
```
4. Mo trinh duyet:
```text
http://localhost:4200
```

### Cach B: Mo truc tiep demo AngularJS (HTML tinh)
1. Clone repo:
```bash
git clone <repo-url>
cd angularjs
```
2. Mo truc tiep `index.html` (hoac bat ky file `*.html` nao trong thu muc goc) bang trinh duyet.

### Cach C: Chay demo AngularJS qua local server
1. Clone repo:
```bash
git clone <repo-url>
cd angularjs
```
2. Chay server tinh:
```bash
npx http-server . -p 8080
```
3. Mo trinh duyet:
```text
http://localhost:8080
```
4. Truy cap cac trang demo:
- `http://localhost:8080/index.html`
- `http://localhost:8080/hello.html`
- `http://localhost:8080/calculator.html`

## 4) Luu y ve thu muc `src/`
- Thu muc `src/` da duoc bo sung cau hinh Angular CLI toi thieu de chay local.
- Lenh build:
```bash
npm run build
```
