import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Background, ButtonStyle } from "@prisma/client";
import Link from "next/link";

type TestDataType = {
    theme: {
        background: Background,
        buttonStyle: ButtonStyle
        key: string
    }
}

const testData: TestDataType = {
    theme: {
        background: {
            id: "",
            color: "#4FC3F7",
            style: "COLORUP",
            type: "COLOR",
            themeId: ""
        },
        buttonStyle: {
            id: "",
            backgroundColor: "#EEEEEE",
            shadowColor: "#EEEEEE",
            textColor: "#424242",
            type: "SOFTSHADOW",
            themeId: ""
        },
        key: "custom",
        luminance: "",
        socialStyleColor: "",
        typefaceColor: "",
        typefaceFamily: ""
    }
}

const testLinks = [
    {
        id: "1",
        url: "https://sdburt.com",
        title: "Portfolio Site",
    },
    {
        id: "2",
        url: "https://github.com/sdburt/sdburt.com",
        title: "Github",
    }
]

const customStyles = {
    SOFTSHADOW: "shadow",
    SOFTSHADOW_ROUNDED: "shadow rounded-lg",
    SOFTSHADOW_CIRCULAR: "shadow rounded-full",

    HARDSHADOW: "hard-shadow",
    HARDSHADOW_ROUNDED: "hard-shadow rounded-lg",
    HARDSHADOW_CIRCULAR: "hard-shadow rounded-full",
}

export default async function PlaygroundPage() {

    const theme = testData.theme;
    const themeStyle = cn(
        "p-4 flex justify-center items-center w-full h-full",
        customStyles[theme.buttonStyle.type],
    )

    return (
        <div className="w-full h-screen flex flex-col justify-center items-center">
            <div className="max-w-2xl w-full p-2 border rounded-md">
                <div className="flex flex-col space-y-2">
                    {testLinks.map(link => (
                        <Link key={link.id} href={link.url} className={themeStyle} style={{ backgroundColor: theme.buttonStyle.backgroundColor }}>
                            <div >
                                <h1>{link.title}</h1>
                            </div>
                        </Link>

                    ))}

                </div>

            </div>
        </div>
    )
}
