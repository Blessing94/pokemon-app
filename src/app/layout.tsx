// Import global CSS file for styling
import "./globals.css";

// Root layout component which wraps around the entire application
export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <header className="header">
                    <h1>Pokémon Explorer</h1>
                    <p>Catch 'em all, learn their secrets, and explore their world!</p>
                </header>

                <main>{children}</main>

                <footer className="footer">
                    <p>&copy; 2025 Pokémon Explorer</p>
                    <p className="designer-tag">Designed by Blessing Mutero</p>
                </footer>
            </body>
        </html>
    );
}
