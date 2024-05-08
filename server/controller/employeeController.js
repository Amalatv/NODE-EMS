// const Employeedata = require('../model/employeeModel');
const Employees = require('../model/employeeModel');



// CREATE EMPLOYEE
const createEmployee = async (req) => {
    try {
        const avatarPath = req.file ? req.file.path : null;

        const newEmployeedata = {
            salutation: req.body.salutation,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phone: req.body.phone,
            gender: req.body.gender,
            dob: req.body.dob,
            country: req.body.country,
            address: req.body.address,
            qualifications: req.body.qualifications,
            state: req.body.state,
            city: req.body.city,
            pin: req.body.pin,
            username: req.body.username,
            password: req.body.password
        };

        if (avatarPath) {
            newEmployeedata.avatar = avatarPath
        }

        const newEmployee = await Employees.create(newEmployeedata)

        return newEmployee;
    } catch (error) {
        throw handleError(error);
    }
};



// FIND EMPLOYEE
const findEmployee = async (req) => {
    const id = req.params.id;
    try {
        if (id) {
            const employee = await Employees.findById(id);
            if (!employee) {
                throw { status: 404, message: `Not found Employee with id ${id}` };
            }
            return employee;
        } else {
            const employees = await Employees.find();
            return employees;
        }
    } catch (error) {
        throw handleError(error);
    }
};

// UPDATE EMPLOYEE
const updateEmployee = async (req) => {
    try {
        const id = req.params.id;
        let avatarPath;

        if (req.file) {
            avatarPath = req.file.path;
        } else {
            const employeeData = await Employees.findById(id);
            console.log("Employee Data:", employeeData);
            if (!employeeData) {
                throw { status: 404, message: `Employee not found with id ${id}` };
            }
            avatarPath = employeeData.avatar;
        }


        const updateData = {
            salutation: req.body.salutation,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phone: req.body.phone,
            gender: req.body.gender,
            dob: req.body.dob,
            country: req.body.country,
            address: req.body.address,
            qualifications: req.body.qualifications,
            state: req.body.state,
            city: req.body.city,
            pin: req.body.pin,
            username: req.body.username,
            password: req.body.password,
            avatar: avatarPath,
        };

        console.log("Update Data:", updateData);

        const updatedEmployee = await Employees.findByIdAndUpdate(id, updateData, { new: true, useFindAndModify: false });
        if (!updatedEmployee) {
            throw { status: 404, message: `Can't Update Employee with ${id}. Maybe employee not found` };
        }
        return updatedEmployee;
    } catch (error) {
        console.error("Backend error:", error);
        throw handleError(error);
    }
};




// DELETE EMPLOYEE
const deleteEmployee = async (req) => {
    try {
        const id = req.params.id;
        const deletedEmployee = await Employees.findByIdAndDelete(id);
        if (!deletedEmployee) {
            throw { status: 404, message: `Can't Delete ${id}. Maybe id is wrong` };
        }
        return { message: "Employee was deleted successfully" };
    } catch (error) {
        throw handleError(error);
    }
};


// search and pagination
const searchEmployee = async (searchKey, page = 1, limit = 10) => {
    try {
        const skip = (page - 1) * limit;

        const search = await Employees.aggregate([
            {
                $match: {
                    $or: [
                        { firstName: { $regex: searchKey, $options: "i" } },
                        { lastName: { $regex: searchKey, $options: "i" } },
                        { dob: { $regex: searchKey, $options: "i" } },
                        { email: { $regex: searchKey, $options: "i" } },
                        { phone: { $regex: searchKey, $options: "i" } },
                        { gender: { $regex: searchKey, $options: "i" } },
                    ]
                }
            },
            { $skip: skip },
            { $limit: limit }
        ]);

        if (search.length === 1) {
            return { search, page };
        }

        return { search, page };

    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};



module.exports = { createEmployee, findEmployee, updateEmployee, deleteEmployee, searchEmployee };




