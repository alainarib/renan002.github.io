const Footer = () => {
  return (
    <footer className="border-t border-border bg-muted/30 py-12">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold gradient-text">
              Juristy
            </h3>
            <p className="text-sm text-muted-foreground">
              Agenda inteligente e triagem jurídica para escritórios e advogados independentes.
            </p>
          </div>
          
          <div>
            <h4 className="mb-4 font-semibold">Produto</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="transition-colors hover:text-primary">Funcionalidades</a></li>
              <li><a href="#" className="transition-colors hover:text-primary">Preços</a></li>
              <li><a href="#" className="transition-colors hover:text-primary">Demonstração</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="mb-4 font-semibold">Empresa</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="transition-colors hover:text-primary">Sobre Nós</a></li>
              <li><a href="#" className="transition-colors hover:text-primary">Blog</a></li>
              <li><a href="#" className="transition-colors hover:text-primary">Contato</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="mb-4 font-semibold">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="transition-colors hover:text-primary">Privacidade</a></li>
              <li><a href="#" className="transition-colors hover:text-primary">Termos de Uso</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Juristy. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
