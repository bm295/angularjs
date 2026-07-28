# Cấu trúc project Angular theo kiểu feature-based

Trong Angular, một cách tổ chức project theo feature-based giúp mã nguồn dễ quản lý hơn khi dự án phát triển lớn. Thay vì gom tất cả thành phần, service, pipe, guard vào cùng một thư mục chung, ta chia chúng theo từng feature riêng biệt.

## 1. Ý tưởng chính

Mỗi feature có thể bao gồm:
- các component riêng của feature đó
- các service dùng cho feature đó
- các model/interface liên quan
- các utility hoặc helper chỉ dùng trong feature
- các file routing nếu feature có route riêng

Điều này giúp:
- dễ tìm code hơn
- giảm sự rối khi nhiều thành viên cùng làm việc
- tách logic theo business domain rõ ràng hơn

## 2. Cấu trúc phổ biến

Một project Angular theo feature-based thường có dạng như sau:

```text
src/
  app/
    core/
      services/
      guards/
      interceptors/
      layout/
    shared/
      components/
      directives/
      pipes/
      models/
    features/
      auth/
        login/
          login.component.ts
          login.component.html
          login.component.css
          login.component.spec.ts
        register/
          register.component.ts
          register.component.html
          register.component.css
        auth-routing.module.ts
        auth.service.ts
        auth.module.ts
      products/
        product-list/
        product-detail/
        product-form/
        products-routing.module.ts
        products.service.ts
        products.module.ts
    app-routing.module.ts
    app.module.ts
```

## 3. Giải thích từng phần

### Core
Thư mục core chứa những phần chung, có tính nền tảng cho toàn bộ ứng dụng như:
- service toàn cục
- guard
- interceptor
- layout tổng
- authentication middleware

### Shared
Thư mục shared chứa các thành phần dùng chung ở nhiều feature khác nhau như:
- button, modal, table, card
- pipe, directive
- model/interface dùng chung

### Features
Thư mục features chứa các module và chức năng riêng của từng nghiệp vụ.
Ví dụ:
- auth: đăng nhập, đăng ký, quên mật khẩu
- products: danh sách sản phẩm, chi tiết sản phẩm, thêm/sửa sản phẩm

Mỗi feature nên có cấu trúc riêng, có thể đặt theo từng domain hoặc theo từng page.

## 4. Ví dụ về một feature

```text
src/app/features/products/
  product-list/
    product-list.component.ts
    product-list.component.html
    product-list.component.css
  product-detail/
    product-detail.component.ts
    product-detail.component.html
  products-routing.module.ts
  products.module.ts
  products.service.ts
```

## 5. Lợi ích của cách này

- Dễ mở rộng khi project lớn dần
- Logic của từng feature được cô lập tốt hơn
- Dễ bảo trì và kiểm thử
- Phù hợp cho dự án có nhiều module và nhiều thành viên tham gia

## 6. Một số nguyên tắc nên áp dụng

- Mỗi feature nên có folder riêng và tự chứa logic của mình
- Các thành phần dùng chung nên đưa vào shared
- Các service chỉ dùng trong một feature nên ở trong feature đó
- Tránh để code rải rác ở thư mục app quá nhiều
- Nếu cần, có thể dùng Angular modules hoặc standalone components để tổ chức rõ hơn

## 7. Kết luận

Cấu trúc feature-based giúp project Angular trở nên rõ ràng, dễ hiểu và dễ phát triển hơn. Đây là một cách tổ chức rất phù hợp cho các ứng dụng có quy mô trung bình hoặc lớn.
