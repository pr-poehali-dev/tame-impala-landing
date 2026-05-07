import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/53ad12e0-8549-44ba-b4e4-60bb659736ef/files/4ce00ff1-4ba0-456e-9af3-339d8a12269e.jpg";

const NAV_ITEMS = [
  { label: "Главная", href: "#home" },
  { label: "О проекте", href: "#about" },
  { label: "Музыка", href: "#music" },
  { label: "Галерея", href: "#gallery" },
  { label: "Магазин", href: "#shop" },
  { label: "Контакты", href: "#contacts" },
];

const ALBUMS = [
  { title: "The Slow Rush", year: "2020", tracks: 12, color: "#ff2d78" },
  { title: "Currents", year: "2015", tracks: 13, color: "#b026ff" },
  { title: "Lonerism", year: "2012", tracks: 13, color: "#00e5ff" },
  { title: "InnerSpeaker", year: "2010", tracks: 11, color: "#ff6b00" },
];

const MERCH = [
  { id: 1, name: "Психоделическая футболка", price: "3 500 ₽", tag: "Хит", color: "#b026ff", emoji: "👕" },
  { id: 2, name: "Виниловая пластинка The Slow Rush", price: "5 200 ₽", tag: "Лимит", color: "#ff2d78", emoji: "💿" },
  { id: 3, name: "Худи с волнами", price: "6 800 ₽", tag: "Новинка", color: "#00e5ff", emoji: "🧥" },
  { id: 4, name: "Постер Currents", price: "1 200 ₽", tag: "Эксклюзив", color: "#ff6b00", emoji: "🖼️" },
  { id: 5, name: "Кепка с логотипом", price: "2 100 ₽", tag: "", color: "#ffe600", emoji: "🧢" },
  { id: 6, name: "Набор стикеров", price: "600 ₽", tag: "", color: "#b026ff", emoji: "✨" },
];

const GALLERY = [
  { gradient: "from-purple-900 to-pink-700", emoji: "🌀" },
  { gradient: "from-cyan-800 to-blue-900", emoji: "🌊" },
  { gradient: "from-orange-700 to-pink-800", emoji: "🔮" },
  { gradient: "from-violet-900 to-cyan-700", emoji: "🌈" },
  { gradient: "from-pink-800 to-orange-600", emoji: "⚡" },
  { gradient: "from-indigo-900 to-purple-700", emoji: "🎸" },
];

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [addedId, setAddedId] = useState<number | null>(null);
  const sectionIds = ["home", "about", "music", "gallery", "shop", "contacts"];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); });
      },
      { threshold: 0.4 }
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleAddToCart = (id: number) => {
    setCartCount((c) => c + 1);
    setAddedId(id);
    setTimeout(() => setAddedId(null), 1500);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubscribed(true);
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--psycho-bg)" }}>
      {/* Animated bg blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute animate-float" style={{ width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(176,38,255,0.15) 0%, transparent 70%)", top: "-200px", left: "-200px" }} />
        <div className="absolute animate-float delay-300" style={{ width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,45,120,0.12) 0%, transparent 70%)", top: "30%", right: "-150px" }} />
        <div className="absolute animate-float delay-600" style={{ width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,229,255,0.1) 0%, transparent 70%)", bottom: "10%", left: "20%" }} />
      </div>

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50" style={{ background: "rgba(10,5,16,0.85)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(176,38,255,0.2)" }}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
          <a href="#home" className="font-orbitron font-black text-xl tracking-widest text-gradient">TAME IMPALA</a>
          <div className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <a key={item.href} href={item.href} className="font-orbitron text-xs tracking-widest uppercase transition-all duration-300"
                style={{ color: activeSection === item.href.slice(1) ? "var(--psycho-cyan)" : "rgba(255,255,255,0.6)", textShadow: activeSection === item.href.slice(1) ? "0 0 15px var(--psycho-cyan)" : "none" }}>
                {item.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <button className="relative">
              <Icon name="ShoppingBag" size={22} style={{ color: "var(--psycho-cyan)" }} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-black" style={{ background: "var(--psycho-pink)" }}>
                  {cartCount}
                </span>
              )}
            </button>
            <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
              <Icon name={menuOpen ? "X" : "Menu"} size={24} style={{ color: "white" }} />
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="md:hidden px-6 py-4 flex flex-col gap-4" style={{ background: "rgba(10,5,16,0.97)" }}>
            {NAV_ITEMS.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)} className="font-orbitron text-sm tracking-widest uppercase" style={{ color: "var(--psycho-cyan)" }}>
                {item.label}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0" style={{ backgroundImage: `url(${HERO_IMAGE})`, backgroundSize: "cover", backgroundPosition: "center", filter: "brightness(0.3) saturate(2)" }} />
        <svg className="absolute bottom-0 left-0 right-0 z-10 w-full" viewBox="0 0 1440 120" preserveAspectRatio="none" style={{ height: 120 }}>
          <path fill="var(--psycho-bg)" d="M0,60 Q180,10 360,60 Q540,110 720,60 Q900,10 1080,60 Q1260,110 1440,60 L1440,120 L0,120 Z" />
        </svg>
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <div className="animate-fade-in-up opacity-0" style={{ animationFillMode: "forwards" }}>
            <p className="font-orbitron text-xs tracking-[0.4em] uppercase mb-6" style={{ color: "var(--psycho-cyan)" }}>✦ Официальный сайт ✦</p>
            <h1 className="font-orbitron font-black mb-6 leading-none" style={{ fontSize: "clamp(3rem, 12vw, 9rem)", letterSpacing: "-0.02em" }}>
              <span className="text-gradient">TAME</span>
              <br />
              <span style={{ color: "white", WebkitTextStroke: "2px var(--psycho-purple)" }}>IMPALA</span>
            </h1>
            <p className="font-montserrat text-lg mb-10 max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.7)" }}>
              Психоделический рок из глубин сознания. Новый альбом уже в эфире.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 justify-center animate-fade-in-up opacity-0 delay-300" style={{ animationFillMode: "forwards" }}>
            <a href="#music" className="btn-psycho px-8 py-4 rounded-full text-sm">Слушать музыку</a>
            <a href="#shop" className="btn-outline-psycho px-8 py-4 rounded-full text-sm">Магазин мерча</a>
          </div>
          <div className="mt-16 relative h-32 flex items-center justify-center">
            {[80, 120, 160].map((size, i) => (
              <div key={i} className="absolute rounded-full animate-pulsate" style={{ width: size, height: size, border: `1px solid ${["var(--psycho-purple)", "var(--psycho-pink)", "var(--psycho-cyan)"][i]}`, opacity: 0.4, animationDelay: `${i * 0.8}s` }} />
            ))}
            <span className="text-4xl animate-spin-slow">🌀</span>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="relative py-32 px-6 z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="font-orbitron text-xs tracking-[0.4em] uppercase mb-4" style={{ color: "var(--psycho-pink)" }}>✦ О проекте</p>
              <h2 className="font-orbitron font-black text-5xl mb-6 leading-tight" style={{ color: "white" }}>
                Музыка из другого <span className="text-gradient">измерения</span>
              </h2>
              <p className="font-montserrat text-base leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.65)" }}>
                Tame Impala — это проект австралийского музыканта Кевина Паркера. С 2007 года он создаёт психоделическую музыку, которая стирает границы между реальностью и сном.
              </p>
              <p className="font-montserrat text-base leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.65)" }}>
                Каждый альбом — путешествие. Многослойные синтезаторы, эхо-гитары и текстуры сознания, записанные в домашней студии в Перте, завоевали миллионы сердец.
              </p>
              <div className="flex gap-8">
                {[{ val: "4", label: "Студийных альбома" }, { val: "15M+", label: "Слушателей" }, { val: "2007", label: "Год основания" }].map((stat) => (
                  <div key={stat.label}>
                    <div className="font-orbitron font-black text-3xl text-gradient">{stat.val}</div>
                    <div className="font-montserrat text-xs mt-1" style={{ color: "rgba(255,255,255,0.5)" }}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="rounded-3xl overflow-hidden glow-purple" style={{ border: "1px solid rgba(176,38,255,0.3)" }}>
                <img src={HERO_IMAGE} alt="Tame Impala" className="w-full object-cover" style={{ height: 420, filter: "saturate(1.5) brightness(0.8)" }} />
                <div className="absolute inset-0 rounded-3xl" style={{ background: "linear-gradient(to top, rgba(10,5,16,0.8) 0%, transparent 60%)" }} />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full flex items-center justify-center text-5xl animate-spin-slow"
                style={{ background: "linear-gradient(135deg, var(--psycho-purple), var(--psycho-pink))", boxShadow: "0 0 40px rgba(176,38,255,0.5)" }}>
                🌀
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MUSIC */}
      <section id="music" className="relative py-32 px-6 z-10">
        <div className="absolute inset-0 z-0" style={{ background: "linear-gradient(180deg, transparent, rgba(176,38,255,0.05) 50%, transparent)" }} />
        <svg className="absolute top-0 left-0 right-0 w-full" viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ height: 60 }}>
          <path fill="rgba(176,38,255,0.08)" d="M0,30 Q360,0 720,30 Q1080,60 1440,30 L1440,0 L0,0 Z" />
        </svg>
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="font-orbitron text-xs tracking-[0.4em] uppercase mb-4" style={{ color: "var(--psycho-orange)" }}>✦ Дискография</p>
            <h2 className="font-orbitron font-black text-5xl" style={{ color: "white" }}>МУЗЫКА</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ALBUMS.map((album, i) => (
              <div key={album.title} className="card-psycho rounded-2xl p-6 cursor-pointer animate-fade-in-up opacity-0" style={{ animationDelay: `${i * 0.15}s`, animationFillMode: "forwards" }}>
                <div className="w-full aspect-square rounded-xl mb-4 flex items-center justify-center text-6xl" style={{ background: `radial-gradient(circle at 30% 30%, ${album.color}33, ${album.color}11)`, border: `1px solid ${album.color}44` }}>
                  💿
                </div>
                <h3 className="font-orbitron font-bold text-base mb-1" style={{ color: "white" }}>{album.title}</h3>
                <p className="font-montserrat text-sm mb-3" style={{ color: "rgba(255,255,255,0.5)" }}>{album.year} · {album.tracks} треков</p>
                <button className="w-full py-2 rounded-xl text-xs font-orbitron font-bold tracking-wider uppercase flex items-center justify-center gap-2 transition-all duration-300"
                  style={{ background: `${album.color}22`, color: album.color, border: `1px solid ${album.color}44` }}
                  onMouseEnter={(e) => { const b = e.currentTarget; b.style.background = `${album.color}44`; b.style.boxShadow = `0 0 20px ${album.color}55`; }}
                  onMouseLeave={(e) => { const b = e.currentTarget; b.style.background = `${album.color}22`; b.style.boxShadow = "none"; }}>
                  <Icon name="Play" size={14} /> Слушать
                </button>
              </div>
            ))}
          </div>

          <div className="mt-12 card-psycho rounded-2xl p-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl flex-shrink-0" style={{ background: "linear-gradient(135deg, var(--psycho-purple), var(--psycho-pink))" }}>🎵</div>
              <div className="flex-1 text-center md:text-left">
                <p className="font-orbitron text-xs tracking-wider uppercase mb-1" style={{ color: "var(--psycho-cyan)" }}>Сейчас в эфире</p>
                <h3 className="font-orbitron font-bold text-2xl text-white mb-1">Lost in Yesterday</h3>
                <p className="font-montserrat text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>The Slow Rush • 4:09</p>
              </div>
              <div className="flex items-center gap-4">
                <button className="w-12 h-12 rounded-full flex items-center justify-center btn-psycho"><Icon name="Play" size={20} /></button>
                <div className="flex gap-1 items-end h-8">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <div key={i} className="w-1 rounded-full animate-pulsate" style={{ height: (i % 5 === 0 ? 32 : i % 3 === 0 ? 20 : 12), background: `hsl(${280 + i * 5}, 80%, 65%)`, animationDelay: `${i * 0.1}s` }} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="relative py-32 px-6 z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="font-orbitron text-xs tracking-[0.4em] uppercase mb-4" style={{ color: "var(--psycho-cyan)" }}>✦ Визуальный мир</p>
            <h2 className="font-orbitron font-black text-5xl" style={{ color: "white" }}>ГАЛЕРЕЯ</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {GALLERY.map((g, i) => (
              <div key={i} className={`rounded-2xl bg-gradient-to-br ${g.gradient} flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-105`}
                style={{ aspectRatio: i % 3 === 0 ? "1/1.4" : "1", border: "1px solid rgba(255,255,255,0.1)" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.boxShadow = "0 0 40px rgba(176,38,255,0.4)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; }}>
                <span className="text-6xl opacity-60">{g.emoji}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SHOP */}
      <section id="shop" className="relative py-32 px-6 z-10">
        <div className="absolute inset-0 z-0" style={{ background: "linear-gradient(180deg, transparent, rgba(255,45,120,0.04) 50%, transparent)" }} />
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="font-orbitron text-xs tracking-[0.4em] uppercase mb-4" style={{ color: "var(--psycho-pink)" }}>✦ Официальный мерч</p>
            <h2 className="font-orbitron font-black text-5xl mb-4" style={{ color: "white" }}>МАГАЗИН</h2>
            <p className="font-montserrat" style={{ color: "rgba(255,255,255,0.5)" }}>Эксклюзивные товары для настоящих фанатов</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MERCH.map((item, i) => (
              <div key={item.id} className="card-psycho rounded-2xl overflow-hidden animate-fade-in-up opacity-0" style={{ animationDelay: `${i * 0.1}s`, animationFillMode: "forwards" }}>
                <div className="relative h-52 flex items-center justify-center text-8xl" style={{ background: `radial-gradient(circle at 40% 40%, ${item.color}22, transparent 70%)`, borderBottom: `1px solid ${item.color}33` }}>
                  {item.tag && (
                    <span className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-orbitron font-bold text-black" style={{ background: item.color }}>{item.tag}</span>
                  )}
                  <span className="animate-pulsate">{item.emoji}</span>
                </div>
                <div className="p-5">
                  <h3 className="font-montserrat font-bold text-base mb-1" style={{ color: "white" }}>{item.name}</h3>
                  <div className="flex items-center justify-between mt-3">
                    <span className="font-orbitron font-bold text-lg" style={{ color: item.color }}>{item.price}</span>
                    <button onClick={() => handleAddToCart(item.id)}
                      className="px-4 py-2 rounded-xl text-xs font-orbitron font-bold tracking-wider uppercase flex items-center gap-2 transition-all duration-300"
                      style={{ background: addedId === item.id ? item.color : `${item.color}22`, color: addedId === item.id ? "#000" : item.color, border: `1px solid ${item.color}` }}>
                      <Icon name={addedId === item.id ? "Check" : "ShoppingCart"} size={14} />
                      {addedId === item.id ? "Добавлено" : "В корзину"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SUBSCRIBE */}
      <section id="subscribe" className="relative py-24 px-6 z-10">
        <div className="max-w-2xl mx-auto text-center">
          <div className="card-psycho rounded-3xl p-12 relative overflow-hidden">
            <div className="absolute inset-0 rounded-3xl" style={{ background: "linear-gradient(135deg, rgba(176,38,255,0.08), rgba(255,45,120,0.05))" }} />
            <div className="relative z-10">
              <div className="text-5xl mb-6">🚀</div>
              <p className="font-orbitron text-xs tracking-[0.4em] uppercase mb-3" style={{ color: "var(--psycho-yellow)" }}>✦ Будь первым</p>
              <h2 className="font-orbitron font-black text-3xl mb-4" style={{ color: "white" }}>ПОДПИСКА</h2>
              <p className="font-montserrat mb-8" style={{ color: "rgba(255,255,255,0.6)" }}>
                Новые треки, эксклюзивный мерч и секретные концерты — только для подписчиков
              </p>
              {subscribed ? (
                <div className="flex items-center justify-center gap-3 text-lg" style={{ color: "var(--psycho-cyan)" }}>
                  <Icon name="CheckCircle" size={28} />
                  <span className="font-orbitron">Ты в списке!</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="твой@email.ru" required
                    className="flex-1 px-5 py-4 rounded-xl font-montserrat text-sm outline-none"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(176,38,255,0.3)", color: "white" }} />
                  <button type="submit" className="btn-psycho px-8 py-4 rounded-xl text-sm whitespace-nowrap">Подписаться</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="relative py-32 px-6 z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="font-orbitron text-xs tracking-[0.4em] uppercase mb-4" style={{ color: "var(--psycho-purple)" }}>✦ Связь</p>
            <h2 className="font-orbitron font-black text-5xl" style={{ color: "white" }}>КОНТАКТЫ</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              { icon: "Mail", label: "Почта", value: "press@tameimpala.com", color: "var(--psycho-purple)" },
              { icon: "Instagram", label: "Instagram", value: "@tameimpala", color: "var(--psycho-pink)" },
              { icon: "Music", label: "Spotify", value: "Tame Impala", color: "var(--psycho-cyan)" },
            ].map((c) => (
              <div key={c.label} className="card-psycho rounded-2xl p-6 text-center">
                <div className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: `${c.color}22`, border: `1px solid ${c.color}44` }}>
                  <Icon name={c.icon} fallback="CircleAlert" size={24} style={{ color: c.color }} />
                </div>
                <p className="font-orbitron text-xs tracking-wider uppercase mb-1" style={{ color: "rgba(255,255,255,0.4)" }}>{c.label}</p>
                <p className="font-montserrat font-semibold" style={{ color: "white" }}>{c.value}</p>
              </div>
            ))}
          </div>
          <div className="card-psycho rounded-2xl p-8">
            <h3 className="font-orbitron font-bold text-lg mb-6" style={{ color: "white" }}>Написать команде</h3>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <input type="text" placeholder="Ваше имя" className="px-5 py-4 rounded-xl font-montserrat text-sm outline-none"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(176,38,255,0.3)", color: "white" }} />
              <input type="email" placeholder="Email" className="px-5 py-4 rounded-xl font-montserrat text-sm outline-none"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(176,38,255,0.3)", color: "white" }} />
            </div>
            <textarea placeholder="Ваше сообщение..." rows={4} className="w-full px-5 py-4 rounded-xl font-montserrat text-sm outline-none mb-4 resize-none"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(176,38,255,0.3)", color: "white" }} />
            <button className="btn-psycho px-8 py-4 rounded-xl text-sm">Отправить сообщение</button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 py-12 px-6" style={{ borderTop: "1px solid rgba(176,38,255,0.2)" }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <span className="font-orbitron font-black text-2xl text-gradient">TAME IMPALA</span>
          <div className="flex gap-6 flex-wrap justify-center">
            {NAV_ITEMS.map((item) => (
              <a key={item.href} href={item.href} className="font-orbitron text-xs tracking-wider uppercase transition-colors duration-200"
                style={{ color: "rgba(255,255,255,0.4)" }}
                onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.color = "var(--psycho-cyan)")}
                onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.color = "rgba(255,255,255,0.4)")}>
                {item.label}
              </a>
            ))}
          </div>
          <p className="font-montserrat text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>© 2026 Tame Impala</p>
        </div>
      </footer>
    </div>
  );
}