const REACT_APP_BASE_URL="https://study-notion-backend-ar34.onrender.com/api/v1"

const BASE_URL=REACT_APP_BASE_URL;

export const categories={
    CATEGORIES_API:BASE_URL+"/course/showAllCategory"
}
//PROFILE ENDPOINTS
export const profileEndpoints = {
    GET_USER_DETAILS_API: BASE_URL + "/profile/getUserDetails",
    GET_USER_ENROLLED_COURSES_API: BASE_URL + "/profile/getEnrolledCourses",
    GET_INSTRUCTOR_DATA_API: BASE_URL + "/profile/instructorDashboard",
}


export const endpoints = {
    SENDOTP_API: BASE_URL + "/auth/sendOtp",
    SIGNUP_API: BASE_URL + "/auth/signup",
    LOGIN_API: BASE_URL + "/auth/login",
    RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
    RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
}

export const profileApis={
    UPDATE_PROFILE:BASE_URL+"/profile/updateProfile",
    UPDATE_DISPLAY_PICTURE:BASE_URL+"/profile/updateDisplayPicture",
    DELETE_ACCOUNT:BASE_URL+"/profile/deleteAccount",
    USERDETAIL_API:BASE_URL+"/profile/getAllUserDetails",
}

export const courseEndpoints={
    //courses
    CREATE_COURSE_API:BASE_URL+"/course/createCourse",
    GET_ALL_COURSES_API:BASE_URL+"/course/showAllCourses",
    GET_COURSE_DETAIL_API:BASE_URL+"/course/showCourseDetail",
    CREATE_CATEGORY_API:BASE_URL+"/course/createCategory",
    GET_ALL_CATEGORY_API:BASE_URL+"/course/showAllCategory",
    EDIT_COURSE_API:BASE_URL+"/course/editCourseDetails",
    DELETE_COURSE_API:BASE_URL+"/course/deleteCourses",
    GET_ENROLLED_COURSE_API:BASE_URL+"/course/getEnrolledCourses",

    //section 
    CREATE_SECTION_API:BASE_URL+"/course/createSection",
    UPDATE_SECTION_API:BASE_URL+"/course/updateSection",
    DELETE_SECTION_API:BASE_URL+"/course/deleteSection",
    //sub section 
    CREATE_SUB_SECTION_API:BASE_URL+"/course/createSubSection",
    UPDATE_SUB_SECTION_API:BASE_URL+"/course/updateSubSection",
    DELETE_SUB_SECTION_API:BASE_URL+"/course/deleteSubSection",
    GET_ALL_INSTRUCTOR_COURSES_API:BASE_URL+"/course/getInstructorCourses",
    //rating 
    CREATE_RATING_API: BASE_URL + "/course/createRating",




}
export const ratingsEndpoints = {
    REVIEWS_DETAILS_API: BASE_URL + "/course/getReviews",
}
export const catalogData = {
    CATALOGPAGEDATA_API: BASE_URL + "/course/getCategoryPageDetails",
}

export const contactusEndpoint = {
    CONTACT_US_API: BASE_URL + "/auth/contactEmail",
}
//student Endpointts
export const studentEnpoints={
    COURSE_PAYMENT_API:BASE_URL+"/payment/capturePayment",
    COURSE_VERIFY_API:BASE_URL+"/payment/verifyPayment",
    SEND_PAYMENT_SUCCESS_EMAIL_API:BASE_URL+"/payment/sendPaymentEmail",
}