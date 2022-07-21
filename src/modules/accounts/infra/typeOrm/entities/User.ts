import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("users")
export class User {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column()
  driver_license: string;

  @Column()
  isAdmin: boolean;

  @Column()
  avatar: string;

  @CreateDateColumn()
  created_at: Date;

  constructor(
    name: string,
    password: string,
    email: string,
    driver_license: string,
    isAdmin = false,
    avatar = ""
  ) {
    this.id = uuidV4();
    this.name = name;
    this.password = password;
    this.email = email;
    this.driver_license = driver_license;
    this.isAdmin = isAdmin;
    this.created_at = new Date();
    this.avatar = avatar;
  }
}
