import axios from "axios";
import config from "../../../config";

export const postURL = async (slug, type) => {
    if (type === "saas-projects") {
        const response = await axios.get(
            `${config.BACKEND_URL}/api/${type}?populate=*&filters[PostURL][$eq]=${slug}&populate[0]=users_permissions_user.UserImage&populate[1]=Tags&populate[2]=ProjectThumbnail.Image&populate[3]=project_categories`
        );
        return response;
    } else {
        const response = await axios.get(
            `${config.BACKEND_URL}/api/${type}?populate=*&filters[PostURL][$eq]=${slug}&populate[0]=users_permissions_user.UserImage&populate[1]=users_permissions_user.UserSocialIcons.Icon&populate[2]=Tags&populate[3]=BlogThumbnail.Image&populate[4]=blog_categories`
        );
        return response;
    }
};
