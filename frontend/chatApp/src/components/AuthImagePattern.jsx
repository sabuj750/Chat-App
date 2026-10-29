const AuthImagePattern = ({ title, subTitle }) => {
  return (
    <div className="relative hidden lg:flex items-center justify-center bg-base-200 p-12 mt-12 overflow-hidden">
      {/* Floating background blobs */}
      <div className="animate-blob absolute -top-10 -left-10 size-64 rounded-full bg-primary/20 blur-3xl" />
      <div
        className="animate-blob absolute -bottom-16 -right-10 size-72 rounded-full bg-secondary/20 blur-3xl"
        style={{ animationDelay: "-5s" }}
      />

      <div className="relative max-w-md text-center">
        {/* Tile grid */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className="animate-pop"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div
                className={`aspect-square rounded-2xl bg-gradient-to-br ring-1 ring-primary/20
                  transition-all duration-300 hover:scale-110 hover:rotate-3 hover:ring-primary/60
                  hover:shadow-lg hover:shadow-primary/20 cursor-default
                  ${
                    i % 2 === 0
                      ? "from-primary/25 to-secondary/15 animate-tile-glow"
                      : "from-primary/10 to-transparent"
                  }`}
                style={i % 2 === 0 ? { animationDelay: `${i * 200}ms` } : undefined}
              />
            </div>
          ))}
        </div>

        <h2
          className="gradient-text text-3xl font-extrabold mb-4 animate-fade-up"
          style={{ animationDelay: "800ms" }}
        >
          {title}
        </h2>
        <p
          className="text-base-content/60 animate-fade-up"
          style={{ animationDelay: "950ms" }}
        >
          {subTitle}
        </p>
      </div>
    </div>
  );
};

export default AuthImagePattern;