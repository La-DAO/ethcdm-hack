# 🌱 Tequio – Tandas Web3 para tod@s

**Tequio** es una aplicación DeFi inspirada en las tradicionales tandas mexicanas. Combinamos ahorro comunitario con tecnología blockchain para ofrecer una alternativa accesible, transparente y descentralizada a los sistemas financieros tradicionales.

---

## 🎯 ¿Qué es una tanda?

En México, millones de personas participan en **tandas** — rondas de ahorro entre familiares y amig@s donde cada integrante aporta una cantidad periódicamente y, en cada ciclo, una persona recibe el total acumulado.  
**Tequio** lleva esta práctica al mundo Web3, automatizando la lógica con contratos inteligentes, eliminando intermediarios y utilizando el token **MXNB** (peso digital de Bitso) como medio de intercambio.

---

## 🛠️ Tecnologías Utilizadas

- **Frontend**: Next.js 15 + ShadCN UI + TailwindCSS + TypeScript
- **Autenticación**: [Privy](https://www.privy.io/)
- **Blockchain**: Solidity + Foundry
- **Conexión Web3**: Wagmi + Privy
- **Red de despliegue**: Arbitrum Sepolia / Scroll
- **Token**: MXNB (peso mexicano digital de Bitso)

---

## ⚙️ Cómo funciona

1. El usuario se autentica vía Privy usando email o wallet.
2. En el dashboard puede crear una nueva tanda o unirse a una existente.
3. Para crear una tanda:
   - Se elige número de participantes.
   - Se define el monto de ahorro en MXNB.
   - Se lanza la tanda y se despliega un contrato desde el `TandaFactory`.
4. Los participantes depositan su contribución.
5. Cada ronda, un usuario recibe los fondos.
6. Todo el flujo es ejecutado y protegido por smart contracts.

---

## 🔗 Contratos Inteligentes

- **TandaFactory** (Creador de tandas)  
  [🔍 Verificado en Arbiscan](https://sepolia.arbiscan.io/address/0x7F080196962aD0c85f068b853AA3468Fd5D17Db7)

- **MXNB Token (Bitso)**  
  [🔍 Contrato oficial en Arbiscan](https://sepolia.arbiscan.io/address/0x82B9e52b26A2954E113F94Ff26647754d5a4247D)

---

## 📄 Documentación adicional

- `contracts/solidity` contiene los contratos `TandaApp.sol` y `TandaFactory.sol`
- `frontend/` contiene el dashboard completo usando ShadCN, Privy y Wagmi

---

## 🧪 Instrucciones para setear el repo

1. Clona el repo:

   ```bash
   git clone https://github.com/garosan1/tequio.git
   cd tequio
   ```

2. Instala dependencias del frontend:

   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. Para testear contratos con Foundry:
   ```bash
   cd contracts/solidity
   forge test
   ```

---

## 🧠 Lecciones aprendidas

- Cómo conectar prácticas culturales como las tandas al ecosistema DeFi
- Despliegue y verificación de contratos en Arbitrum Sepolia y Scroll
- Integración rápida de Privy y MXNB para experiencias de usuario sin fricción

---

## 🏆 Contribuciones

Hecho con ❤️🌮 por:

- [@garosan1](https://x.com/garosan1)
- [@iafhurtado](https://x.com/iafhurtado)
