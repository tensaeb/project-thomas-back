import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database";

class User extends Model {
  public id!: number;
  public firstName!: string;
  public lastName!: string;
  public email!: string;
  public password!: string;
  public profileImage!: string;

  static associate(models: any) {
    // Define associations if any
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profileImage: {
      type: DataTypes.STRING,
      get() {
        return `https://avatar.iran.liara.run/username?username=${encodeURIComponent(
          this.firstName
        )}+${encodeURIComponent(this.lastName)}`;
      },
    },
  },
  {
    sequelize,
    tableName: "users",
  }
);

export default User;
