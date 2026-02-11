import { useState, useEffect } from 'react';
import { reservationsAPI, ordersAPI } from '../services/api';
import { LayoutDashboard, Calendar, ShoppingBag, CheckCircle, XCircle } from 'lucide-react';

interface Reservation {
    id: number;
    user: { firstname: string; lastname: string };
    table: { number: number };
    reservationDate: string;
    reservationTime: string;
    numberOfPeople: number;
    status: string;
}

interface Order {
    id: number;
    user: { firstname: string; lastname: string };
    orderDate: string;
    totalPrice: number;
    status: string;
}

export default function AdminPage() {
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const [resResponse, ordResponse] = await Promise.all([
                reservationsAPI.getAll(),
                ordersAPI.getAll(),
            ]);
            setReservations(resResponse.data);
            setOrders(ordResponse.data);
        } catch (error) {
            console.error('Error loading data:', error);
        } finally {
            setLoading(false);
        }
    };

    const updateReservationStatus = async (id: number, status: string) => {
        try {
            await reservationsAPI.updateStatus(id, status);
            loadData();
        } catch (error) {
            console.error('Error updating reservation:', error);
        }
    };

    const updateOrderStatus = async (id: number, status: string) => {
        try {
            await ordersAPI.updateStatus(id, status);
            loadData();
        } catch (error) {
            console.error('Error updating order:', error);
        }
    };

    const getStatusColor = (status: string) => {
        const colors: Record<string, string> = {
            PENDING: 'text-yellow-400 bg-yellow-500/20',
            CONFIRMED: 'text-green-400 bg-green-500/20',
            CANCELLED: 'text-red-400 bg-red-500/20',
            CREATED: 'text-blue-400 bg-blue-500/20',
            PAID: 'text-green-400 bg-green-500/20',
            READY: 'text-purple-400 bg-purple-500/20',
        };
        return colors[status] || 'text-gray-400 bg-gray-500/20';
    };

    return (
        <div className="page-container min-h-screen bg-gradient-to-b from-slate-900 to-slate-950">
            <div className="max-w-7xl mx-auto px-4 py-12">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="flex justify-center mb-4">
                        <LayoutDashboard className="text-gold-400" size={48} />
                    </div>
                    <h1 className="text-6xl font-playfair font-bold text-white mb-4">
                        Admin Dashboard
                    </h1>
                    <p className="text-xl text-gray-400">
                        Gérer les réservations et les commandes
                    </p>
                </div>

                {loading ? (
                    <div className="text-center py-20">
                        <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-gold-400"></div>
                    </div>
                ) : (
                    <div className="grid lg:grid-cols-2 gap-8">
                        {/* Reservations */}
                        <div>
                            <h2 className="text-3xl font-playfair font-bold text-white mb-6 flex items-center gap-3">
                                <Calendar className="text-gold-400" size={32} />
                                Réservations ({reservations.length})
                            </h2>

                            <div className="space-y-4">
                                {reservations.map(res => (
                                    <div key={res.id} className="premium-card">
                                        <div className="flex justify-between items-start mb-3">
                                            <div>
                                                <h3 className="text-xl font-semibold text-white">
                                                    {res.user.firstname} {res.user.lastname}
                                                </h3>
                                                <p className="text-gray-400">
                                                    Table {res.table.number} • {res.numberOfPeople} personnes
                                                </p>
                                            </div>
                                            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(res.status)}`}>
                                                {res.status}
                                            </span>
                                        </div>

                                        <p className="text-gray-400 mb-4">
                                            {new Date(res.reservationDate).toLocaleDateString()} à {res.reservationTime}
                                        </p>

                                        {res.status === 'PENDING' && (
                                            <div className="flex gap-3">
                                                <button
                                                    onClick={() => updateReservationStatus(res.id, 'CONFIRMED')}
                                                    className="flex-1 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
                                                >
                                                    <CheckCircle size={18} />
                                                    Confirmer
                                                </button>
                                                <button
                                                    onClick={() => updateReservationStatus(res.id, 'CANCELLED')}
                                                    className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
                                                >
                                                    <XCircle size={18} />
                                                    Annuler
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ))}

                                {reservations.length === 0 && (
                                    <p className="text-center text-gray-400 py-8">Aucune réservation</p>
                                )}
                            </div>
                        </div>

                        {/* Orders */}
                        <div>
                            <h2 className="text-3xl font-playfair font-bold text-white mb-6 flex items-center gap-3">
                                <ShoppingBag className="text-gold-400" size={32} />
                                Commandes ({orders.length})
                            </h2>

                            <div className="space-y-4">
                                {orders.map(order => (
                                    <div key={order.id} className="premium-card">
                                        <div className="flex justify-between items-start mb-3">
                                            <div>
                                                <h3 className="text-xl font-semibold text-white">
                                                    {order.user?.firstname} {order.user?.lastname}
                                                </h3>
                                                <p className="text-2xl font-bold text-gold-400">
                                                    {order.totalPrice.toFixed(2)}€
                                                </p>
                                            </div>
                                            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}>
                                                {order.status}
                                            </span>
                                        </div>

                                        <p className="text-gray-400 mb-4">
                                            {new Date(order.orderDate).toLocaleDateString()}
                                        </p>

                                        <div className="flex gap-2">
                                            {['CREATED', 'PAID', 'READY'].map(status => (
                                                <button
                                                    key={status}
                                                    onClick={() => updateOrderStatus(order.id, status)}
                                                    className={`flex-1 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${order.status === status
                                                            ? 'bg-gold-500 text-white'
                                                            : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                                                        }`}
                                                >
                                                    {status}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                ))}

                                {orders.length === 0 && (
                                    <p className="text-center text-gray-400 py-8">Aucune commande</p>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
