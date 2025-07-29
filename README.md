# Tổng hợp:

# nhánh main:

1. từ main lấy dữ liệu mới

```bash
git pull
```

2. tạo nhánh mới

```bash
git checkout -b anhpt2
```

3. add new edit

```bash
git add .
```

4. commit chinh sua

```bash
git commit -m "noi dung edit"
```

5. đẩy code

```bash
git push origin anhpt2
```

6. ve nhanh main

```bash
git checkout main
```

# nhánh main:

7. merge main với nhánh vừa push

```bash
git merge anhpt2
```

8. push code lên nhánh main

```bash
git push origin main
```

9. xóa nhánh local tại máy

```bash
git branch -D anhpt2
```

10. xóa nhánh remote

```bash
git push origin --delete anhpt2
```

11. Thực hiện lại thao tác từ số 1.
