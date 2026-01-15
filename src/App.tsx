import { useState } from 'react';
import { Send, Globe2, Loader2, Code2, Terminal } from 'lucide-react';

interface Greeting {
  id: string;
  date: Date;
  name: string;
  message: string;
}

// Datos iniciales de ejemplo (en memoria)
const INITIAL_DATA: Greeting[] = [
  {
    id: '1',
    date: new Date(),
    name: 'Sistema',
    message: '¡Bienvenido! Esta es una demostración de React sin base de datos.'
  },
  {
    id: '2',
    date: new Date(Date.now() - 1000 * 60 * 5),
    name: 'Desarrollador',
    message: 'Todo el estado se maneja localmente usando React Hooks.'
  }
];

function App() {
  const [greetings, setGreetings] = useState<Greeting[]>(INITIAL_DATA);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setSending(true);

    // Simular latencia de red para efecto profesional
    setTimeout(() => {
      const newGreeting: Greeting = {
        id: crypto.randomUUID(),
        date: new Date(),
        name: name,
        message: message
      };

      setGreetings((prev) => [newGreeting, ...prev]);
      setMessage('');
      setSending(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white py-16 px-4 shadow-lg">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-4">
            <Globe2 size={64} className="animate-bounce text-emerald-200" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
            Hola Mundo Profesional
          </h1>
          <p className="text-lg md:text-xl text-emerald-100 max-w-2xl mx-auto">
            Aplicación Cliente-Servidor simulada. React + Vite + Tailwind CSS.
            <br />
            <span className="text-sm opacity-80">(Sin persistencia de datos)</span>
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12 -mt-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Input Form */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-8 border-t-4 border-emerald-500">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Send size={20} className="text-emerald-600" />
                Nuevo Mensaje
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Nombre</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition"
                    placeholder="Tu nombre"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Mensaje</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition h-24 resize-none"
                    placeholder="Escribe algo interesante..."
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-sm"
                >
                  {sending ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
                  {sending ? 'Procesando...' : 'Publicar'}
                </button>
              </form>
            </div>
          </div>

          {/* Greetings List */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-xl shadow-md overflow-hidden border-t-4 border-slate-400">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Terminal size={20} className="text-slate-600" />
                  Consola de Saludos
                </h2>
                <span className="text-sm text-slate-500 font-medium bg-slate-200 px-3 py-1 rounded-full">
                  {greetings.length} items
                </span>
              </div>
              
              <div className="max-h-[600px] overflow-y-auto">
                {greetings.length === 0 ? (
                  <div className="text-center py-12 text-slate-500">
                    No hay mensajes en memoria.
                  </div>
                ) : (
                  <ul className="divide-y divide-slate-100">
                    {greetings.map((greet) => (
                      <li key={greet.id} className="p-6 hover:bg-slate-50 transition duration-150 group">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center gap-2">
                            <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-sm">
                              {greet.name.charAt(0).toUpperCase()}
                            </span>
                            <span className="font-bold text-slate-800">{greet.name}</span>
                          </div>
                          <span className="text-xs text-slate-400 flex items-center gap-1">
                            <Code2 size={12} />
                            {greet.date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                          </span>
                        </div>
                        <div className="pl-10">
                           <p className="text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100 inline-block w-full">
                            {greet.message}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="bg-slate-50 p-3 text-center text-xs text-slate-400 border-t border-slate-100">
                Los datos son efímeros y se perderán al recargar la página.
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;