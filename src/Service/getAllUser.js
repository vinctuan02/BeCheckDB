import User from "../Models/Users";

export const getAllUsers = async () => {
    try {
        // Sử dụng phương thức findAll() để lấy tất cả các bản ghi từ bảng User
        const users = await User.findAll();

        // Trả về mảng chứa tất cả các bản ghi người dùng
        // console.log("users: ", users[1])
        console.table(users.map(item => item.dataValues))
        return users;
    } catch (error) {
        // Xử lý lỗi nếu có
        console.error('Error retrieving users:', error);
        throw error; // Re-throw lỗi để xử lý ở phía gọi hàm
    }
};
