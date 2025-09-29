export const SITE = {
    website: "https://blog.kirac.dev/",
    author: "Kıraç Acar Apaydın",
    profile: "https://www.linkedin.com/in/kirac-acar/", // or your personal website if you have one
    desc: "My Personal Blog",
    title: "blog.kirac.dev",
    ogImage: "astropaper-og.jpg", // you can customize this
    lightAndDarkMode: true,
    postPerIndex: 4,
    postPerPage: 10,
    scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
    showArchives: true,
    showBackButton: true,
    editPost: {
        enabled: false, // set to true if you want to enable edit links
        text: "Edit page",
        url: "https://github.com/rbt15/your-repo/edit/main/", // update with your repo
    },
    dynamicOgImage: true,
    dir: "ltr",
    lang: "en",
    timezone: "Europe/Istanbul", // Istanbul timezone
} as const;