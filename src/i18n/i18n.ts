import { createI18n } from "vue-i18n";
export let locale = "en"
export const i18n = createI18n({
    locale: locale,
    legacy: false,
    globalInjection: true,
    messages: {
        en: {
            message: {
                // header
                language: "Language",
                home: "Home",
                expert: "Expert",
                fqas: "FQAs",
                askquestion: "Ask Question",
                orderexpert: "Order Expert",
                expertprofile: "Expert Profile",
                expertinfo: "Expert Info",
                events: "Events",
                news: "News",
                profilesetting: "Profile Setting",
                history: "history",
                logout: "Log Out",
                login: "Log in",
                // home
                leadingexpert: "Leading Experts",
                degree: "Degree",
                researcharea: "Research Area",
                viewallexperts: "View all experts",
                fields: "Fields",
                showmore: "Show more",
                seemoreanswers: "See more answers",
                viewallnews: "View all news",
                answer: "Answer",
                question: "Question",
                // footer
                Feature: "Feature",
                FindanExpert: "Find an Expert",
                FindEvents: "Find Events",
                Discover: "Discover",
                Security: "Security",
                Sponsor: "Sponsor",
                Information: "Information",
                Rules: "Rules",
                Aboutus: "About us",
                Community: "Community",



            }
        },
        vi: {
            message: {
                language: "Ngôn ngữ",
                home: "Trang chủ",
                expert: "Chuyên gia",
                fqas: "Câu hỏi",
                askquestion: "Hỏi đáp",
                orderexpert: "Đặt hàng",
                expertprofile: "Chuyên gia",
                expertinfo: "Thông tin chuyên gia",
                events: "Sự kiện",
                news: "Tin tức",
                profilesetting: "Thay đổi thông tin",
                history: "Lịch sử",
                logout: "Đăng xuất",
                login: "Đăng nhập",
                // home
                leadingexpert: "Chuyên gia đầu ngành",
                viewallexperts: "Tất cả chuyên gia",
                fields: "Lĩnh vực",
                showmore: "Xem thêm",
                degree: "Trình độ",
                researcharea: "Lĩnh vực",
                seemoreanswers: "Chi tiết",
                viewallnews: "Xem thêm",
                answer: "Trả lời",
                question: "Câu hỏi",
                // footer
                Feature: "Tính năng",
                FindanExpert: "Tìm kiếm chuyên gia",
                FindEvents: "Tìm kiếm sự kiện",
                Discover: "Khám phá",
                Security: "Bảo mật",
                Sponsor: "Tài trợ",
                Information: "Thông tin",
                Rules: "Quy tắc",
                Aboutus: "Về Chúng tôi",
                Community: "Cộng đồng",

            }
        },
    }
});


// export enum Locales {
//     EN = 'en',
//     VI = 'vi',
// }

// export const defaultLocale = Locales.EN;