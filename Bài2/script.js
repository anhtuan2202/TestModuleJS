
const users = [
    { id: 1, first_name: "Tuan", last_name: "Nguyen", email: "nat2202@gmail.com", password: "anhtuan2002" },
    { id: 2, first_name: "Anh", last_name: "Tuan", email: "natuan2202@gmail.com", password: "anhtuan2002" }
];

const posts = [
    { id: 1, title: "Hello Class", content: "Đây là tấm backgroud", image: "1.jpg", created_at: "2024-12-12", updated_at: "2024-12-12", user_id: 1 },
    { id: 2, title: "Hello Class", content: "Đây là tấm backgroud", image: "1.jpg", created_at: "2024-12-12", updated_at: "2024-12-12", user_id: 2 }
];

//  Đăng nhập
function handleLogin() {
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    if (!email || !password) {
        document.getElementById("login-message").innerText = "Hãy nhập đầy đủ thông tin";
        return;
    }

    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        document.getElementById("login-message").innerText = `Xin chào ${user.first_name} ${user.last_name}`;
    } else {
        document.getElementById("login-message").innerText = "Thông tin tài khoản không chính xác";
    }
}

//  Đăng ký
function handleRegister() {
    const firstName = document.getElementById("register-first-name").value;
    const lastName = document.getElementById("register-last-name").value;
    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;

    if (!firstName || !lastName || !email || !password) {
        document.getElementById("register-message").innerText = "Hãy nhập đầy đủ thông tin";
        return;
    }

    const existingUser = users.find(u => u.email === email);

    if (existingUser) {
        document.getElementById("register-message").innerText = "Email này đã có tài khoản";
    } else {
        const newUser = {
            id: users.length + 1,
            first_name: firstName,
            last_name: lastName,
            email,
            password
        };
        users.push(newUser);
        document.getElementById("register-message").innerText = "Đăng ký thành công!";
    }
}
