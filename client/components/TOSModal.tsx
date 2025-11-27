import { useState } from "react";
import { X, CheckCircle2 } from "lucide-react";

interface TOSModalProps {
  isOpen: boolean;
  onAccept: () => void;
  onReject: () => void;
}

export default function TOSModal({
  isOpen,
  onAccept,
  onReject,
}: TOSModalProps) {
  const [isAccepted, setIsAccepted] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div
        className="w-full max-w-2xl rounded-2xl max-h-[80vh] overflow-hidden flex flex-col"
        style={{
          background: "rgba(17, 17, 17, 0.95)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.6)",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-xl font-semibold text-white">
            Conditions d'utilisation et Politique de confidentialité
          </h2>
          <button
            onClick={onReject}
            className="p-1 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X size={20} className="text-gray-400 hover:text-white" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 text-gray-300 text-sm leading-relaxed space-y-4">
          <section>
            <h3 className="text-base font-semibold text-white mb-2">
              1. Conditions d'utilisation
            </h3>
            <p>
              En accédant et en utilisant VanIA, vous acceptez de respecter ces
              conditions d'utilisation. Notre plateforme est fournie "en l'état"
              pour votre usage personnel et non commercial.
            </p>
          </section>

          <section>
            <h3 className="text-base font-semibold text-white mb-2">
              2. Responsabilités de l'utilisateur
            </h3>
            <p>
              Vous êtes responsable de maintenir la confidentialité de votre
              compte et de vos identifiants. Vous acceptez d'être responsable de
              toute activité effectuée depuis votre compte. Vous vous engagez à
              ne pas utiliser la plateforme pour :
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 ml-2">
              <li>Violer les lois ou règlements applicables</li>
              <li>Diffuser des contenus illégaux ou offensants</li>
              <li>Contourner les systèmes de sécurité</li>
              <li>Usurper l'identité d'une autre personne</li>
              <li>Utiliser la plateforme à des fins commerciales non autoris��es</li>
            </ul>
          </section>

          <section>
            <h3 className="text-base font-semibold text-white mb-2">
              3. Propriété intellectuelle
            </h3>
            <p>
              Tout contenu généré par VanIA reste la propriété de VanIA. Les
              contenus que vous téléchargez conservent votre propriété
              intellectuelle, mais vous nous accordez une licence pour les
              utiliser dans le fonctionnement et l'amélioration du service.
            </p>
          </section>

          <section>
            <h3 className="text-base font-semibold text-white mb-2">
              4. Limitation de responsabilité
            </h3>
            <p>
              VanIA n'est pas responsable des dommages indirects, incidents ou
              consécutifs résultant de votre utilisation de la plateforme. Votre
              responsabilité est limitée aux frais payés pour le service.
            </p>
          </section>

          <section>
            <h3 className="text-base font-semibold text-white mb-2">
              5. Politique de confidentialité
            </h3>
            <p>
              Nous collectons et traitons vos données personnelles conformément à
              cette politique et à la réglementation en vigueur (RGPD, CCPA, etc.).
              Les données que vous fournissez sont utilisées pour :
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 ml-2">
              <li>Fournir et améliorer nos services</li>
              <li>Communiquer avec vous</li>
              <li>Garantir la sécurité et la conformité</li>
            </ul>
          </section>

          <section>
            <h3 className="text-base font-semibold text-white mb-2">
              6. Sécurité des données
            </h3>
            <p>
              Vos données sont chiffrées et stockées en toute sécurité. Nous
              utilisons des protocoles de sécurité standards de l'industrie pour
              protéger vos informations. Cependant, aucune transmission par
              Internet n'est 100% sécurisée.
            </p>
          </section>

          <section>
            <h3 className="text-base font-semibold text-white mb-2">
              7. Modification du service
            </h3>
            <p>
              VanIA se réserve le droit de modifier ou interrompre le service à
              tout moment. Nous vous notifierons des modifications importantes via
              votre adresse email.
            </p>
          </section>

          <section>
            <h3 className="text-base font-semibold text-white mb-2">
              8. Résiliation
            </h3>
            <p>
              Vous pouvez résilier votre compte à tout moment. VanIA peut
              résilier votre compte en cas de violation de ces conditions.
            </p>
          </section>

          <section>
            <h3 className="text-base font-semibold text-white mb-2">
              9. Contact
            </h3>
            <p>
              Pour toute question concernant ces conditions ou votre vie privée,
              contactez-nous via notre site web.
            </p>
          </section>
        </div>

        {/* Footer */}
        <div className="border-t border-white/10 p-6 space-y-4 bg-black/20">
          {/* Checkbox */}
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="tos-accept"
              checked={isAccepted}
              onChange={(e) => setIsAccepted(e.target.checked)}
              className="w-5 h-5 mt-1 rounded cursor-pointer accent-blue-500"
            />
            <label htmlFor="tos-accept" className="text-sm text-gray-300 cursor-pointer flex-1">
              J'accepte les conditions d'utilisation et la politique de
              confidentialité
            </label>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={onReject}
              className="flex-1 px-4 py-3 rounded-2xl font-medium text-sm transition-all duration-200"
              style={{
                background: "rgba(255, 255, 255, 0.08)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                color: "rgb(209, 213, 219)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.12)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)";
              }}
            >
              Refuser
            </button>
            <button
              onClick={onAccept}
              disabled={!isAccepted}
              className="flex-1 px-4 py-3 rounded-2xl font-medium text-sm transition-all duration-200 flex items-center justify-center gap-2"
              style={{
                background: isAccepted
                  ? "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)"
                  : "rgba(59, 130, 246, 0.3)",
                color: "white",
                cursor: isAccepted ? "pointer" : "not-allowed",
              }}
              onMouseEnter={(e) => {
                if (isAccepted) {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 16px rgba(59, 130, 246, 0.3)";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <CheckCircle2 size={16} />
              Accepter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
