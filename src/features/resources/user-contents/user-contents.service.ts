import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserContent, UserContentDocument } from "./user-contents.schema";
import { CreateUserContentDto } from "./dto/create-user-content.dto";
import { UpdateUserContentDto } from "./dto/update-user-content.dto";

@Injectable()
export class UserContentsService {
    constructor(
        @InjectModel(UserContent.name) private userContentModel: Model<UserContentDocument>
    ) { }

    async getOrCreate(user: string): Promise<UserContent> {
        let content = await this.userContentModel.findOne({ user });
        if (!content) {
            return this.create({
                user,
                closet: [],
                wishlist: [],
                coordinations: [],
                modified: Date.now()
            });
        }
        return content;
    }

    async create(createUserContentDto: CreateUserContentDto): Promise<UserContent> {
        const createdUserContent = new this.userContentModel(createUserContentDto);
        return createdUserContent.save();
    }

    async update(updateUserContentDto: UpdateUserContentDto): Promise<UserContent> {
        const item = await this.userContentModel.findById(updateUserContentDto._id);
        item.closet = updateUserContentDto.closet;
        item.wishlist = updateUserContentDto.wishlist;
        item.coordinations = updateUserContentDto.coordinations;
        item.modified = updateUserContentDto.modified;
        return item.save();
    }
}