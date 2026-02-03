"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  LogOut,
  Download,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  Database,
  RefreshCw,
} from "lucide-react"

interface Order {
  id: number
  order_id: string
  app: "DR" | "EH"
  is_test: boolean
  client_name: string
  client_email: string
  company_name: string
  property_address: string
  items: any[]
  total_amount: number
  created_at: string
}

interface User {
  id: number
  email: string
  name: string
}

export default function VaultDashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  // Filters
  const [appFilter, setAppFilter] = useState<string>("all")
  const [testFilter, setTestFilter] = useState<string>("all")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    checkSession()
  }, [])

  useEffect(() => {
    if (user) {
      fetchOrders()
    }
  }, [user, page, appFilter, testFilter, startDate, endDate])

  const checkSession = async () => {
    try {
      const response = await fetch("/api/vault/session")
      const data = await response.json()

      if (!data.user) {
        router.push("/vault/login")
        return
      }

      setUser(data.user)
    } catch (error) {
      router.push("/vault/login")
    }
  }

  const fetchOrders = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      params.set("page", page.toString())
      params.set("limit", "20")

      if (appFilter !== "all") params.set("app", appFilter)
      if (testFilter !== "all") params.set("is_test", testFilter)
      if (startDate) params.set("start_date", startDate)
      if (endDate) params.set("end_date", endDate)

      const response = await fetch(`/api/vault/orders?${params}`)
      const data = await response.json()

      if (!response.ok) {
        if (response.status === 401) {
          router.push("/vault/login")
          return
        }
        throw new Error(data.error)
      }

      setOrders(data.orders)
      setTotal(data.total)
      setTotalPages(data.totalPages)
    } catch (error) {
      console.error("Failed to fetch orders:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    await fetch("/api/vault/logout", { method: "POST" })
    router.push("/vault/login")
  }

  const handleExport = () => {
    const params = new URLSearchParams()
    if (appFilter !== "all") params.set("app", appFilter)
    if (testFilter !== "all") params.set("is_test", testFilter)
    if (startDate) params.set("start_date", startDate)
    if (endDate) params.set("end_date", endDate)

    window.location.href = `/api/vault/export?${params}`
  }

  const filteredOrders = orders.filter((order) => {
    if (!searchTerm) return true
    const term = searchTerm.toLowerCase()
    return (
      order.order_id.toLowerCase().includes(term) ||
      order.client_name.toLowerCase().includes(term) ||
      order.client_email.toLowerCase().includes(term) ||
      order.company_name.toLowerCase().includes(term)
    )
  })

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <RefreshCw className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <header className="bg-slate-800 border-b border-slate-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Database className="w-8 h-8 text-blue-500" />
            <div>
              <h1 className="text-xl font-bold text-white">Order Vault</h1>
              <p className="text-sm text-slate-400">Logged in as {user.email}</p>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={handleLogout}
            className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </header>

      <main className="p-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="p-4 bg-slate-800 border-slate-700">
            <p className="text-slate-400 text-sm">Total Orders</p>
            <p className="text-2xl font-bold text-white">{total}</p>
          </Card>
          <Card className="p-4 bg-slate-800 border-slate-700">
            <p className="text-slate-400 text-sm">DR Orders</p>
            <p className="text-2xl font-bold text-blue-400">
              {orders.filter((o) => o.app === "DR").length}
            </p>
          </Card>
          <Card className="p-4 bg-slate-800 border-slate-700">
            <p className="text-slate-400 text-sm">EH Orders</p>
            <p className="text-2xl font-bold text-green-400">
              {orders.filter((o) => o.app === "EH").length}
            </p>
          </Card>
          <Card className="p-4 bg-slate-800 border-slate-700">
            <p className="text-slate-400 text-sm">Test Orders</p>
            <p className="text-2xl font-bold text-yellow-400">
              {orders.filter((o) => o.is_test).length}
            </p>
          </Card>
        </div>

        {/* Filters */}
        <Card className="p-4 bg-slate-800 border-slate-700 mb-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-slate-400" />
              <span className="text-slate-300 font-medium">Filters:</span>
            </div>

            <Select value={appFilter} onValueChange={setAppFilter}>
              <SelectTrigger className="w-32 bg-slate-700 border-slate-600 text-white">
                <SelectValue placeholder="App" />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                <SelectItem value="all" className="text-white">All Apps</SelectItem>
                <SelectItem value="DR" className="text-white">DR</SelectItem>
                <SelectItem value="EH" className="text-white">EH</SelectItem>
              </SelectContent>
            </Select>

            <Select value={testFilter} onValueChange={setTestFilter}>
              <SelectTrigger className="w-36 bg-slate-700 border-slate-600 text-white">
                <SelectValue placeholder="Order Type" />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                <SelectItem value="all" className="text-white">All Orders</SelectItem>
                <SelectItem value="false" className="text-white">Real Only</SelectItem>
                <SelectItem value="true" className="text-white">Test Only</SelectItem>
              </SelectContent>
            </Select>

            <Input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-40 bg-slate-700 border-slate-600 text-white"
              placeholder="Start Date"
            />

            <Input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-40 bg-slate-700 border-slate-600 text-white"
              placeholder="End Date"
            />

            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <Input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search orders..."
                className="pl-10 bg-slate-700 border-slate-600 text-white placeholder:text-slate-500"
              />
            </div>

            <Button
              onClick={handleExport}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </Card>

        {/* Orders Table */}
        <Card className="bg-slate-800 border-slate-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-700">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-300">Order ID</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-300">App</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-300">Client</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-300">Company</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-300">Total</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-300">Items</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-300">Date</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-300">Type</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {loading ? (
                  <tr>
                    <td colSpan={8} className="px-4 py-8 text-center text-slate-400">
                      <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2" />
                      Loading orders...
                    </td>
                  </tr>
                ) : filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-4 py-8 text-center text-slate-400">
                      No orders found
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-slate-700/50">
                      <td className="px-4 py-3 text-sm font-mono text-blue-400">{order.order_id}</td>
                      <td className="px-4 py-3">
                        <Badge
                          className={
                            order.app === "DR"
                              ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
                              : "bg-green-500/20 text-green-400 border-green-500/30"
                          }
                        >
                          {order.app}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-sm text-white">{order.client_name}</p>
                        <p className="text-xs text-slate-400">{order.client_email}</p>
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-300">{order.company_name}</td>
                      <td className="px-4 py-3 text-sm font-medium text-white">
                        ${order.total_amount.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-300">
                        {Array.isArray(order.items) ? order.items.length : 0}
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-400">
                        {new Date(order.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3">
                        {order.is_test ? (
                          <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                            Test
                          </Badge>
                        ) : (
                          <Badge className="bg-slate-500/20 text-slate-400 border-slate-500/30">
                            Real
                          </Badge>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-4 py-3 border-t border-slate-700">
            <p className="text-sm text-slate-400">
              Showing {filteredOrders.length} of {total} orders
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span className="text-sm text-slate-400">
                Page {page} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      </main>
    </div>
  )
}
