import { Route, Routes } from 'react-router-dom';
import { Header } from './components/Header';
import { Modal } from './components/Modal';
import { Sidebar } from './components/Sidebar';
import { Toast } from './components/Toast';
import { Damaged } from './pages/Damaged';
import { Dashboard } from './pages/Dashboard';
import { Inventory } from './pages/Inventory';
import { Mobile } from './pages/Mobile';
import { Products } from './pages/Products';
import { Reports } from './pages/Reports';
import { Returns } from './pages/Returns';
import { Settings } from './pages/Settings';
import { StockIn } from './pages/StockIn';
import { StockOut } from './pages/StockOut';
import { Transfers } from './pages/Transfers';
import { Users } from './pages/Users';
import { Warehouses } from './pages/Warehouses';

export function App() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--color-bg)', color: 'var(--color-text)' }}>
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <Header />
        <main style={{ flex: 1, overflow: 'auto', padding: '30px 34px 60px' }}>
          <Toast />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/products" element={<Products />} />
            <Route path="/warehouses" element={<Warehouses />} />
            <Route path="/stock-in" element={<StockIn />} />
            <Route path="/stock-out" element={<StockOut />} />
            <Route path="/transfers" element={<Transfers />} />
            <Route path="/returns" element={<Returns />} />
            <Route path="/damaged-goods" element={<Damaged />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/users" element={<Users />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/mobile" element={<Mobile />} />
          </Routes>
        </main>
      </div>
      <Modal />
    </div>
  );
}
