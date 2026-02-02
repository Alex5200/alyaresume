import {MousePointer2} from "lucide-react"

export default function AdminPortfolio() {
    return(
        <div className="flex flex-col text-center gap-3 mx-auto mt-20">
            <a href="/admin/contacts" className="text-blue-600"> contact editor <MousePointer2/>  </a>
            <a href="/admin/portfolio " className="text-blue-600">portfolio editor</a>
        </div>
    )
}