"use client";

import { useState, useEffect } from "react";

const APPS = [
  { name: "Kuru", icon: "/logos/kuru.jpeg", description: "Kuru is a high-performance, fully on-chain order book decentralized exchange (DEX). Designed to provide a Centralized Exchange (CEX)-like trading experience directly on-chain", category: "DeFi", url: "https://kuru.io" },
  { name: "Curvance", icon: "/logos/curvance.png", description: "Cross-chain money market enabling lending, borrowing, and yield optimization natively built for Monad's high-performance EVM.", category: "DeFi", url: "https://curvance.com/" },
  { name: "aPriori", icon: "/logos/aPriori.jpeg", description: "MEV-powered liquid staking protocol on Monad, letting users stake $MON, earn boosted yields, and receive $aprMON for use across DeFi.", category: "DeFi", url: "https://www.apr.io/" },
  { name: "Kintsu", icon: "/logos/kintsu.jpg", description: "Composable liquid staking protocol on Monad, letting users stake $MON for $sMON and deploy it across DeFi while earning validator rewards.", category: "DeFi", url: "https://kintsu.xyz/staking" },
  { name: "Poply", icon: "/logo/poply.png", description: "Community-based NFT Marketplace and Launchpad Powered by Poply Otters NFT Collection", category: "NFT", url: "https://poply.xyz" },
  { name: "Chog", icon: "/logos/chog.jpg", description: "Born from the Monad community, Chog has become the most adored monanimal. Chog is a mischievous kid who is curious and he always finds new ways to cause chaos.", category: "NFT", url: "https://chog.xyz" },
  { name: "NadPoker", icon: "/logos/nadpoker.jpg", description: "The first poker lounge on Monad.", category: "NFT", url: "https://nadpoker.xyz" },
  { name: "Nodal", icon: null, description: "One-click RPC infrastructure for Monad with global edge nodes and 99.99% uptime SLA.", category: "Infra", url: "#" },
  { name: "BlockWatch", icon: null, description: "Real-time block explorer with parallel transaction tracing and call graph visualization.", category: "Infra", url: "#" },
  { name: "MonadBridge", icon: null, description: "Canonical cross-chain bridge connecting Monad to Ethereum, Solana, and major L2s.", category: "Infra", url: "#" },
  { name: "Ignite SDK", icon: null, description: "Type-safe TypeScript SDK for Monad with hooks, contract abstractions, and wallet connectors.", category: "Tools", url: "#" },
  { name: "Faucet Pro", icon: null, description: "Testnet token faucet with Discord and GitHub verification, distributing MON on demand.", category: "Tools", url: "#" },
  { name: "Trace", icon: null, description: "Developer debugging suite with step-through EVM execution and storage diff viewer.", category: "Tools", url: "#" },
  { name: "Vault Guard", icon: null, description: "Automated smart contract auditing tool fine-tuned on Monad's parallel execution model.", category: "Tools", url: "#" },
  { name: "Uniswap", icon: null, description: "The leading decentralized trading protocol on Monad. Supports V2 and V3 liquidity pools for seamless token swaps.", category: "DeFi", url: "https://uniswap.org" },
  { name: "PancakeSwap", icon: null, description: "Multi-chain AMM DEX bringing its battle-tested swap infrastructure and liquidity pools to Monad.", category: "DeFi", url: "https://pancakeswap.finance" },
  { name: "Ambient", icon: null, description: "Zero-to-one DEX architecture running liquidity on a single smart contract, offering concentrated and full-range liquidity on Monad.", category: "DeFi", url: "https://ambient.finance" },
  { name: "Balancer", icon: null, description: "Programmable liquidity protocol with weighted pools, stable pools, and composable liquidity on Monad.", category: "DeFi", url: "https://balancer.fi" },
  { name: "Clober", icon: null, description: "Fully on-chain order book DEX built for high-frequency trading, leveraging Monad's parallel execution for low-latency fills.", category: "DeFi", url: "https://clober.io" },
  { name: "Atlantis", icon: null, description: "Concentrated liquidity AMM on Monad built on Algebra's architecture with eternal farming and V2 swap support.", category: "DeFi", url: "#" },
  { name: "Monadex", icon: null, description: "Native AMM DEX on Monad with raffles and community incentives baked directly into the trading experience.", category: "DeFi", url: "#" },
  { name: "OctoSwap", icon: null, description: "Community-driven DEX on Monad offering V2 and V3 pools, universal router, and testnet NFT rewards.", category: "DeFi", url: "#" },
  { name: "ReactorFi", icon: null, description: "Ve(3,3) DEX on Monad with gauge voting, bribes, and protocol-owned liquidity mechanics.", category: "DeFi", url: "#" },
  { name: "iZUMi Finance", icon: null, description: "Discretized liquidity AMM enabling limit orders and concentrated liquidity on Monad.", category: "DeFi", url: "https://izumi.finance" },
  { name: "Dexalot", icon: null, description: "On-chain central limit order book DEX with cross-chain trading and a familiar CEX-style interface.", category: "DeFi", url: "https://dexalot.com" },
  { name: "Bean Exchange", icon: null, description: "Hybrid DEX on Monad combining spot and perpetuals trading with a shared strategy vault.", category: "DeFi", url: "#" },
  { name: "Bubblefi", icon: null, description: "AMM DEX on Monad with raffle mechanics and community-driven liquidity incentives.", category: "DeFi", url: "#" },
  { name: "Crust Finance", icon: null, description: "Concentrated liquidity DEX on Monad with a full suite of position management and quoting tools.", category: "DeFi", url: "#" },
  { name: "Crystal", icon: null, description: "On-chain DEX on Monad with a router factory architecture and data helper tools for liquidity management.", category: "DeFi", url: "#" },
  { name: "Defx", icon: null, description: "Decentralized exchange on Monad providing high-throughput on-chain trading infrastructure.", category: "DeFi", url: "#" },
  { name: "Doppler", icon: null, description: "Token launchpad built on Uniswap V3 and V2 infrastructure on Monad with governance factory and liquidity migration.", category: "DeFi", url: "#" },
  { name: "Dyson Finance", icon: null, description: "Automated market maker on Monad with a router-based swap system for efficient token exchange.", category: "DeFi", url: "#" },
  { name: "Gasp", icon: null, description: "Decentralized exchange protocol on Monad with on-chain settlement and liquidity provisioning.", category: "DeFi", url: "#" },
  { name: "LFJ", icon: null, description: "Liquidity book AMM on Monad providing deep liquidity and customizable bin strategies for token pairs.", category: "DeFi", url: "#" },
  { name: "Mach Exchange", icon: null, description: "High-performance on-chain exchange on Monad optimized for speed and low-latency trade execution.", category: "DeFi", url: "#" },
  { name: "Madness", icon: null, description: "AMM DEX on Monad featuring a router-factory model with multicall support for efficient swap bundling.", category: "DeFi", url: "#" },
  { name: "Monday Trade", icon: null, description: "Spot and derivatives DEX on Monad with NFT position management, quoter, and aggregated swap routing.", category: "DeFi", url: "#" },
  { name: "Nabla Finance", icon: null, description: "Single-sided AMM on Monad using a portal and router system with Pyth oracle price integration.", category: "DeFi", url: "#" },
  { name: "NitroFinance", icon: null, description: "Combined DEX and lending protocol on Monad with game mechanics, debt management, and point rewards.", category: "DeFi", url: "#" },
  { name: "Nostra", icon: null, description: "Lending and DEX hybrid on Monad with CDP management, flash loans, and Chainlink and Pyth oracle support.", category: "DeFi", url: "#" },
  { name: "Standard Protocol", icon: null, description: "On-chain matching engine DEX on Monad enabling order-book style trading with on-chain settlement.", category: "DeFi", url: "#" },
  { name: "Swaap", icon: null, description: "Safeguard AMM on Monad built on Balancer's vault architecture with oracle-protected liquidity pools.", category: "DeFi", url: "https://swaap.finance" },
  { name: "TAYA", icon: null, description: "AMM factory on Monad combining DEX trading and prediction market mechanics in a single protocol.", category: "DeFi", url: "#" },
  { name: "Tadle", icon: null, description: "Pre-market trading protocol on Monad enabling token trading before official launch via escrow contracts.", category: "DeFi", url: "#" },
  { name: "Yamata", icon: null, description: "0x-based DEX on Monad with ERC-4337 smart account support and native order settlement.", category: "DeFi", url: "#" },
  { name: "zkSwap Finance", icon: null, description: "Multi-model DEX on Monad supporting V2, V3, stable swaps, and universal routing in one protocol.", category: "DeFi", url: "#" },
  { name: "Amertis", icon: null, description: "Decentralized exchange on Monad with a router-based swap system for token trading.", category: "DeFi", url: "#" },
  { name: "0x", icon: null, description: "The 0x DEX aggregator protocol on Monad routing swaps via its allowance holder for best-price execution.", category: "DeFi", url: "https://0x.org" },
  { name: "Azaar", icon: null, description: "DEX aggregator on Monad sourcing liquidity across multiple AMMs for optimal swap pricing.", category: "DeFi", url: "#" },
  { name: "Eisen", icon: null, description: "Diamond-proxy DEX aggregator on Monad enabling modular and upgradeable swap routing.", category: "DeFi", url: "#" },
  { name: "Gmgn", icon: null, description: "DEX aggregator router on Monad delivering fast and gas-efficient token swaps across liquidity sources.", category: "DeFi", url: "#" },
  { name: "Mace", icon: null, description: "DEX aggregator on Monad routing through Kuru and Nitro adapters for optimal swap execution.", category: "DeFi", url: "#" },
  { name: "Madhouse", icon: null, description: "DEX aggregator on Monad supporting Uniswap V2/V3 and PancakeSwap adapters for best-rate swaps.", category: "DeFi", url: "#" },
  { name: "Monorail", icon: null, description: "Token swap aggregator on Monad sourcing best prices across the ecosystem's DEX landscape.", category: "DeFi", url: "#" },
  { name: "Rubic", icon: null, description: "Cross-chain DEX aggregator routing swaps across Monad and 70+ chains with best-price execution.", category: "DeFi", url: "https://rubic.exchange" },
  { name: "Bebop", icon: null, description: "Intent-based trading protocol offering RFQ and JAM order types for optimal swap execution on Monad.", category: "DeFi", url: "https://bebop.xyz" },
  { name: "Hashflow", icon: null, description: "Cross-chain DEX using request-for-quote pricing to guarantee zero slippage and MEV-protected trades.", category: "DeFi", url: "https://hashflow.com" },
  { name: "Hedgemony", icon: null, description: "Intent-based swap router on Monad combining DeFi trading with AI-powered strategy execution.", category: "DeFi", url: "#" },
  { name: "Clanker", icon: null, description: "AI-powered token launchpad on Monad with automated LP locking and vault management.", category: "DeFi", url: "#" },
  { name: "Flap", icon: null, description: "Token launchpad on Monad offering both legacy and latest bonding curve deployment models.", category: "DeFi", url: "#" },
  { name: "Nad.fun", icon: null, description: "Fair-launch memecoin launchpad on Monad with bonding curves, community treasuries, and built-in DEX routing.", category: "DeFi", url: "https://nad.fun" },
  { name: "Seed Circle", icon: null, description: "Decentralized fundraising launchpad on Monad with KYC, investment proof NFTs, and cross-chain deposit support.", category: "DeFi", url: "#" },
  { name: "XL", icon: null, description: "Memecoin launchpad on Monad with integrated swap functionality and community-driven token launches.", category: "DeFi", url: "#" },
  { name: "Neverland", icon: null, description: "Aave-forked lending and borrowing protocol on Monad supporting WMON, WETH, WBTC, USDC, and more.", category: "DeFi", url: "#" },
  { name: "Euler", icon: null, description: "Modular lending protocol enabling permissionless vault creation and customizable risk parameters on Monad.", category: "DeFi", url: "https://euler.finance" },
  { name: "Folks Finance", icon: null, description: "Cross-chain lending protocol with Wormhole-powered spokes, enabling unified collateral across chains including Monad.", category: "DeFi", url: "https://folks.finance" },
  { name: "Peridot", icon: null, description: "Compound-style money market on Monad supporting multiple collateral types with isolated lending pools.", category: "DeFi", url: "#" },
  { name: "Pike", icon: null, description: "Universal liquidity protocol enabling cross-chain lending with beacon-based risk and oracle engines.", category: "DeFi", url: "https://pike.finance" },
  { name: "Ammalgam", icon: null, description: "Combined AMM and lending protocol on Monad enabling LPs to earn both swap fees and lending yield simultaneously.", category: "DeFi", url: "#" },
  { name: "BrahmaFi", icon: null, description: "Smart account protocol on Monad combining policy-based wallet management with DEX and lending integration.", category: "DeFi", url: "https://brahma.fi" },
  { name: "Covenant", icon: null, description: "Multi-protocol DeFi suite on Monad combining lending, DEX, stablecoin, and yield in a single platform.", category: "DeFi", url: "#" },
  { name: "Kinza Finance", icon: null, description: "Aave-based lending protocol on Monad with Pyth oracle pricing and isolated lending pool markets.", category: "DeFi", url: "#" },
  { name: "Spine Finance", icon: null, description: "Lending protocol on Monad providing capital-efficient borrowing and lending markets.", category: "DeFi", url: "#" },
  { name: "Sumer", icon: null, description: "Compound-forked lending protocol on Monad with a redemption manager and cross-asset borrowing markets.", category: "DeFi", url: "#" },
  { name: "Timeswap", icon: null, description: "Oracle-free lending protocol on Monad with fixed-term pools and options-based interest rate mechanics.", category: "DeFi", url: "https://timeswap.io" },
  { name: "tread.fi", icon: null, description: "Vault-based lending protocol on Monad using attestation contracts for credit and risk management.", category: "DeFi", url: "#" },
  { name: "Magma", icon: null, description: "Liquid staking protocol on Monad with role-based management and a stake manager optimized for validator yields.", category: "DeFi", url: "#" },
  { name: "StakeStone", icon: null, description: "Omnichain liquid staking protocol bridging STONE yield-bearing tokens to Monad via LayerZero.", category: "DeFi", url: "https://stakestone.io" },
  { name: "Swing Monad", icon: null, description: "Liquid staking pool on Monad with an oracle system and staking pool optimized for MON validator rewards.", category: "DeFi", url: "#" },
  { name: "Narwhal Finance", icon: null, description: "Decentralized perpetuals exchange on Monad with Pyth oracle pricing, referral rewards, and a tinder-style trading mode.", category: "DeFi", url: "#" },
  { name: "KiloEx", icon: null, description: "Hybrid vault perpetuals DEX on Monad with on-chain price feeds, position routing, and multi-asset margin support.", category: "DeFi", url: "https://kiloex.io" },
  { name: "Zaros", icon: null, description: "Perpetuals and market-making engine on Monad with a trading account NFT system and unified perps and MM liquidity.", category: "DeFi", url: "https://zaros.fi" },
  { name: "Pingu Exchange", icon: null, description: "On-chain perpetuals exchange on Monad with a full suite of stores for positions, orders, funding, and risk management.", category: "DeFi", url: "#" },
  { name: "Purps", icon: null, description: "Decentralized perpetuals protocol on Monad with factory-based market deployment and smart router.", category: "DeFi", url: "#" },
  { name: "Primex Finance", icon: null, description: "Prime brokerage protocol on Monad enabling leveraged trading across DEXes with cross-protocol position management.", category: "DeFi", url: "https://primex.finance" },
  { name: "FastLane", icon: null, description: "MEV infrastructure protocol on Monad providing an address hub for searchers and block builders.", category: "DeFi", url: "#" },
  { name: "Isle Finance", icon: null, description: "Real-world asset lending protocol on Monad enabling receivables-backed pools with institutional credit rails.", category: "DeFi", url: "#" },
  { name: "Mu Digital", icon: null, description: "RWA bond protocol on Monad enabling on-chain issuance and primary market trading of digital bonds.", category: "DeFi", url: "#" },
  { name: "SkyTrade", icon: null, description: "DePIN and RWA protocol on Monad tokenizing airspace rights as tradeable on-chain real-world assets.", category: "DeFi", url: "#" },
  { name: "Zona", icon: null, description: "Real-world asset protocol on Monad with on-chain oracle and master contract for RWA tokenization.", category: "DeFi", url: "#" },
  { name: "Agora", icon: null, description: "Stablecoin issuer deploying a fully-backed USD-pegged stablecoin natively on Monad.", category: "DeFi", url: "https://agora.finance" },
  { name: "Circle USDC", icon: null, description: "Native USDC issued by Circle on Monad, enabling seamless dollar-denominated DeFi across the ecosystem.", category: "DeFi", url: "https://circle.com" },
  { name: "Unipay", icon: null, description: "Stablecoin protocol on Monad issuing USDu with a minting contract, staking rewards, and asset issuance infrastructure.", category: "DeFi", url: "#" },
  { name: "Bima", icon: null, description: "CDP-based stablecoin protocol on Monad using Morpho vaults, trove managers, and wrapped collateral.", category: "DeFi", url: "#" },
  { name: "Solv Protocol", icon: null, description: "Bitcoin yield protocol bringing SolvBTC and SolvBTC-BBN to Monad for BTC holders to earn native yields.", category: "DeFi", url: "https://solv.finance" },
  { name: "Renzo", icon: null, description: "Liquid restaking protocol deploying ezETH on Monad to let users earn EigenLayer rewards without managing validators.", category: "DeFi", url: "https://renzoprotocol.com" },
  { name: "PumpBTC", icon: null, description: "Bitcoin liquid staking protocol on Monad enabling BTC holders to earn native staking yield.", category: "DeFi", url: "#" },
  { name: "Multipli.fi", icon: null, description: "Yield fund protocol on Monad enabling structured asset management with automated investment strategies.", category: "DeFi", url: "#" },
  { name: "Garden", icon: null, description: "Cross-chain Bitcoin bridge on Monad enabling HTLC-based atomic swaps of cbBTC and USDC.", category: "DeFi", url: "https://garden.finance" },
  { name: "Aarna", icon: null, description: "Automated yield vault protocol on Monad with modular boosters, rebalancing strategies, and on-chain oracle integration.", category: "DeFi", url: "#" },
  { name: "Enjoyoors", icon: null, description: "Yield vault protocol on Monad with a withdrawal approver system for managed liquidity strategies.", category: "DeFi", url: "#" },
  { name: "Gamma Strategies", icon: null, description: "Automated liquidity management protocol providing active concentrated liquidity vaults on Monad DEXes.", category: "DeFi", url: "https://gamma.xyz" },
  { name: "Rysk", icon: null, description: "Options and yield protocol on Monad with a controller and margin pool for structured derivatives.", category: "DeFi", url: "https://rysk.finance" },
  { name: "Accountable", icon: null, description: "Yield aggregator on Monad with game and animal proxy systems for gamified yield strategies.", category: "DeFi", url: "#" },
  { name: "Golden Goose", icon: null, description: "USDT yield aggregator vault on Monad providing automated yield optimization for stablecoin holders.", category: "DeFi", url: "#" },
  { name: "Fufuture", icon: null, description: "Decentralized options protocol on Monad enabling on-chain options trading and structured products.", category: "DeFi", url: "#" },
  { name: "Dirol Protocol", icon: null, description: "DeFi liquidity protocol on Monad with dual LP contracts for optimized capital deployment.", category: "DeFi", url: "#" },
  { name: "FUKU", icon: null, description: "Prize pool protocol on Monad with a pool manager distributing yield-based prizes to depositors.", category: "DeFi", url: "#" },
  { name: "Hive", icon: null, description: "On-chain money market on Monad with separate USDC, WMON, aprMON, gMON, and sMON markets.", category: "DeFi", url: "#" },
  { name: "Rug Rumble", icon: null, description: "Memecoin social game on Monad where players battle with memecoins in a community-driven on-chain arena.", category: "DeFi", url: "#" },
  { name: "Monucet", icon: null, description: "Testnet token faucet protocol on Monad for distributing test assets to developers and testers.", category: "DeFi", url: "#" },
  { name: "SendMonad.com", icon: null, description: "Simple token transfer contract on Monad enabling easy asset sending across the ecosystem.", category: "DeFi", url: "#" },
  { name: "Magic Eden", icon: null, description: "The leading multi-chain NFT marketplace now supporting Monad, offering trading, launchpad, and creator tools.", category: "NFT", url: "https://magiceden.io" },
  { name: "Reservoir", icon: null, description: "NFT liquidity infrastructure providing a universal router and Seaport v1.6 integration for Monad marketplaces.", category: "NFT", url: "https://reservoir.tools" },
  { name: "Gifted.art", icon: null, description: "NFT gifting platform on Monad enabling users to wrap and send NFTs as on-chain gifts with GiftedBox smart contracts.", category: "NFT", url: "#" },
  { name: "Monport", icon: null, description: "Monad-native NFT collection and trading hub with integrated DEX functionality for NFT-fi experiences.", category: "NFT", url: "#" },
  { name: "Lootify", icon: null, description: "NFT infrastructure protocol on Monad providing loot box mechanics and randomized reward distribution.", category: "NFT", url: "#" },
  { name: "coNFT", icon: null, description: "NFT infrastructure protocol on Monad enabling collaborative and co-owned NFT creation and management.", category: "NFT", url: "#" },
  { name: "ELEPHAPP", icon: null, description: "NFT collection protocol on Monad with on-chain collection deployment and community minting infrastructure.", category: "NFT", url: "#" },
  { name: "EmelVerse", icon: null, description: "NFT collection and metaverse project on Monad building immersive digital experiences around on-chain assets.", category: "NFT", url: "#" },
  { name: "LA MOUCH", icon: null, description: "NFT collection on Monad bringing a unique artistic identity to the ecosystem through on-chain collectibles.", category: "NFT", url: "#" },
  { name: "Motatoes", icon: null, description: "NFT collection on Monad with a community-first approach to digital collectibles and on-chain provenance.", category: "NFT", url: "#" },
  { name: "Montools", icon: null, description: "NFT infrastructure and developer tooling on Monad providing bulk transfer and native multi-send contracts.", category: "NFT", url: "#" },
  { name: "Pyth Network", icon: null, description: "High-fidelity oracle network providing low-latency price feeds and entropy randomness for Monad applications.", category: "Infra", url: "https://pyth.network" },
  { name: "Chainlink", icon: null, description: "Industry-standard oracle infrastructure providing price feeds, CCIP messaging, and VRF randomness on Monad.", category: "Infra", url: "https://chain.link" },
  { name: "Band", icon: null, description: "Decentralized oracle network providing cross-chain data feeds and price data for Monad smart contracts.", category: "Infra", url: "https://bandprotocol.com" },
  { name: "Stork", icon: null, description: "Ultra-low-latency oracle network on Monad delivering real-time price data for high-frequency DeFi applications.", category: "Infra", url: "https://stork.network" },
  { name: "Switchboard", icon: null, description: "Decentralized oracle network providing customizable data feeds and verifiable randomness for Monad smart contracts.", category: "Infra", url: "https://switchboard.xyz" },
  { name: "eOracle", icon: null, description: "EigenLayer-secured oracle on Monad providing BTC, ETH, USDC, and USDT price feeds with restaking security.", category: "Infra", url: "#" },
  { name: "Orochi Network", icon: null, description: "Zero-knowledge oracle network on Monad providing verifiable on-chain data and computation.", category: "Infra", url: "https://orochi.network" },
  { name: "Diffuse", icon: null, description: "On-chain price feeder on Monad providing BTC/USDT, ETH/BTC, ETH/USDC, and ETH/USDT data feeds.", category: "Infra", url: "#" },
  { name: "LayerZero", icon: null, description: "Omnichain interoperability protocol providing messaging infrastructure connecting Monad to 70+ blockchain networks.", category: "Infra", url: "https://layerzero.network" },
  { name: "Wormhole", icon: null, description: "Cross-chain messaging and token bridge protocol enabling secure asset and data transfer between Monad and other chains.", category: "Infra", url: "https://wormhole.com" },
  { name: "Axelar", icon: null, description: "Universal interoperability network connecting Monad to the broader Web3 ecosystem via gateway and gas service contracts.", category: "Infra", url: "https://axelar.network" },
  { name: "Hyperlane", icon: null, description: "Permissionless interoperability layer allowing any application to connect Monad to any other blockchain.", category: "Infra", url: "https://hyperlane.xyz" },
  { name: "Circle CCTP", icon: null, description: "Circle Cross-Chain Transfer Protocol enabling native USDC transfers between Monad and other supported chains.", category: "Infra", url: "https://circle.com/cctp" },
  { name: "t3rn", icon: null, description: "Cross-chain execution protocol on Monad enabling trustless multi-chain transactions and smart contract interoperability.", category: "Infra", url: "https://t3rn.io" },
  { name: "Fiamma", icon: null, description: "ZK bridge proxy protocol on Monad providing verifiable cross-chain state proofs.", category: "Infra", url: "#" },
  { name: "Polymer", icon: null, description: "IBC-based interoperability layer providing a cross-L2 prover for Monad enabling trustless cross-chain state verification.", category: "Infra", url: "https://polymerlabs.org" },
  { name: "Owlto Finance", icon: null, description: "Fast cross-chain bridge aggregator supporting low-cost transfers to and from Monad with intent-based settlement.", category: "Infra", url: "https://owlto.finance" },
  { name: "Nad Name Service", icon: null, description: "Monad-native naming service letting users register human-readable .nad domains linked to their wallet addresses.", category: "Infra", url: "#" },
  { name: "Mon Name Service", icon: null, description: "On-chain domain name protocol on Monad enabling .mon address registration for wallets and contracts.", category: "Infra", url: "#" },
  { name: "AllDomains", icon: null, description: "Multi-chain domain name protocol expanding to Monad with on-chain identity and name resolution.", category: "Infra", url: "#" },
  { name: "Anima", icon: null, description: "On-chain identity protocol providing verifiable credentials and reputation primitives for Monad applications.", category: "Infra", url: "#" },
  { name: "Intract", icon: null, description: "Web3 quest and identity platform on Monad connecting users with ecosystem projects through on-chain activity.", category: "Infra", url: "https://intract.io" },
  { name: "QuestN", icon: null, description: "Web3 quest platform on Monad enabling projects to run on-chain campaigns and community engagement programs.", category: "Infra", url: "https://questn.com" },
  { name: "Gelato", icon: null, description: "Web3 automation and account abstraction infrastructure providing relay, paymaster, and automation services on Monad.", category: "Infra", url: "https://gelato.network" },
  { name: "Pimlico", icon: null, description: "Account abstraction infrastructure provider offering ERC-4337 bundler and paymaster services on Monad.", category: "Infra", url: "https://pimlico.io" },
  { name: "Ambire Wallet", icon: null, description: "Smart contract wallet with account abstraction, paymaster support, and a unified interface for Monad DeFi.", category: "Infra", url: "https://ambire.com" },
  { name: "HaHa Wallet", icon: null, description: "ERC-4337 smart wallet on Monad with bundler, fee manager, and merkle-based airdrop distribution built in.", category: "Infra", url: "#" },
  { name: "Cordial Systems", icon: null, description: "Smart wallet infrastructure on Monad providing programmable account management and transaction automation.", category: "Infra", url: "#" },
  { name: "Nomas Wallet", icon: null, description: "Non-custodial wallet protocol on Monad with on-chain account management and asset control.", category: "Infra", url: "#" },
  { name: "Encifher", icon: null, description: "Privacy protocol on Monad wrapping USDC and USDT into encrypted equivalents for confidential on-chain transfers.", category: "Infra", url: "#" },
  { name: "Primus", icon: null, description: "zkTLS infrastructure on Monad enabling zero-knowledge proofs of web2 data for on-chain verification.", category: "Infra", url: "#" },
  { name: "Flipside Crypto", icon: null, description: "Blockchain analytics platform providing on-chain data dashboards and SQL queries for the Monad ecosystem.", category: "Infra", url: "https://flipsidecrypto.xyz" },
  { name: "Canonical Contracts", icon: null, description: "Foundational contracts on Monad including Multicall3, Permit2, EntryPoint, Create2 deployers, and WMON.", category: "Infra", url: "#" },
  { name: "Tarobase", icon: null, description: "Developer tooling protocol on Monad providing deterministic contract deployment infrastructure.", category: "Infra", url: "#" },
  { name: "Mentaport", icon: null, description: "Location-based NFT infrastructure on Monad providing geofenced minting and location-verified digital ownership.", category: "Infra", url: "#" },
  { name: "Meta Leap", icon: null, description: "Gaming infrastructure on Monad with check-in systems, mining mechanics, and subscription management.", category: "Infra", url: "#" },
  { name: "Legends of Elysium", icon: null, description: "On-chain trading card and strategy game on Monad with hero NFTs, card battles, and a full marketplace ecosystem.", category: "Gaming", url: "https://legendsofelysium.io" },
  { name: "Showdown", icon: null, description: "Competitive esports wagering platform on Monad for CS2 and Chess matches with on-chain settlement and tournament brackets.", category: "Gaming", url: "#" },
  { name: "AtDawn", icon: null, description: "On-chain RPG on Monad with avatar NFTs, weapon crafting, prop systems, and a fully on-chain settlement engine.", category: "Gaming", url: "#" },
  { name: "Treasure Dwarf Battles", icon: null, description: "On-chain battle game on Monad featuring dwarf NFTs, resource mining, crafting, and a free-to-play entry mode.", category: "Gaming", url: "#" },
  { name: "Valley of Heroes", icon: null, description: "On-chain RPG on Monad with hero NFTs, mystery boxes, a cursed valley dungeon, and an HONOR token reward system.", category: "Gaming", url: "#" },
  { name: "RgbClash", icon: null, description: "Color-based NFT battle game on Monad where players clash color NFTs in single and multiplayer on-chain games.", category: "Gaming", url: "#" },
  { name: "Wenwin", icon: null, description: "Decentralized lottery protocol on Monad with Gelato-powered randomness and fully on-chain prize pool management.", category: "Gaming", url: "https://wenwin.com" },
  { name: "Monad 2048", icon: null, description: "The classic 2048 puzzle game reimagined fully on-chain on Monad with verifiable game state and on-chain scoring.", category: "Gaming", url: "#" },
  { name: "MonadTiles", icon: null, description: "On-chain tile-based puzzle game on Monad with provably fair mechanics and on-chain leaderboard.", category: "Gaming", url: "#" },
  { name: "Nadflip", icon: null, description: "On-chain coinflip betting game on Monad with provably fair outcomes and instant settlement.", category: "Gaming", url: "#" },
  { name: "Monflipcoin", icon: null, description: "On-chain coin flip game on Monad with simple betting mechanics and transparent outcome verification.", category: "Gaming", url: "#" },
  { name: "Dark Forest Ares", icon: null, description: "zkSNARK-based on-chain space strategy game on Monad with hidden information and real-time conquest mechanics.", category: "Gaming", url: "#" },
  { name: "Blast Commander", icon: null, description: "On-chain tactical game on Monad with item NFTs, game record contracts, and mini-game mechanics.", category: "Gaming", url: "#" },
  { name: "Plato", icon: null, description: "On-chain gaming protocol on Monad with a staking vault and NFT-based asset system for in-game economies.", category: "Gaming", url: "#" },
  { name: "Redbrick", icon: null, description: "Blockchain gaming platform on Monad enabling developers to build and deploy on-chain games with verifiable logic.", category: "Gaming", url: "#" },
  { name: "Monix", icon: null, description: "On-chain metaverse game on Monad with box NFTs, game manager, and ERC-721 collection infrastructure.", category: "Gaming", url: "#" },
  { name: "Outpost Surge", icon: null, description: "On-chain strategy game on Monad with tower defense mechanics and fully on-chain game state.", category: "Gaming", url: "#" },
  { name: "PLAY Network", icon: null, description: "Gaming ecosystem protocol on Monad providing infrastructure for on-chain game deployment and player economies.", category: "Gaming", url: "#" },
  { name: "Slay The Moloch", icon: null, description: "On-chain dungeon crawler on Monad where players battle the Moloch through provably fair combat mechanics.", category: "Gaming", url: "#" },
  { name: "Tezza Poker", icon: null, description: "Fully on-chain poker game on Monad with verifiable card dealing, betting rounds, and pot management.", category: "Gaming", url: "#" },
  { name: "The Aviator", icon: null, description: "On-chain crash game on Monad with provably fair multiplier mechanics and instant settlement.", category: "Gaming", url: "#" },
  { name: "Gomoku3", icon: null, description: "On-chain Gomoku board game on Monad enabling two-player strategy matches with verifiable outcomes.", category: "Gaming", url: "#" },
  { name: "Jarvis", icon: null, description: "On-chain gaming contract on Monad providing a verifiable game engine for competitive player experiences.", category: "Gaming", url: "#" },
  { name: "Anterris", icon: null, description: "On-chain gaming protocol on Monad with NFT collection infrastructure for in-game asset ownership.", category: "Gaming", url: "#" },
  { name: "Catton AI", icon: null, description: "AI-powered gaming project on Monad combining on-chain game contracts with AI character systems.", category: "Gaming", url: "#" },
  { name: "DRKVRS", icon: null, description: "Dark metaverse game on Monad with on-chain protocol contracts for immersive gaming experiences.", category: "Gaming", url: "#" },
  { name: "Bro Fun", icon: null, description: "Mobile-first on-chain game on Monad designed for casual play with simple mechanics and community rewards.", category: "Gaming", url: "#" },
  { name: "beatBRAWLS", icon: null, description: "Rhythm-based battle game on Monad combining music and on-chain combat in a competitive format.", category: "Gaming", url: "#" },
  { name: "Hawk Terminal", icon: null, description: "On-chain gaming terminal on Monad providing a unified interface for multiple on-chain game experiences.", category: "Gaming", url: "#" },
  { name: "Valor Quest", icon: null, description: "On-chain RPG quest game on Monad with verifiable adventure mechanics and on-chain reward distribution.", category: "Gaming", url: "#" },
  { name: "GameRelay", icon: null, description: "Gaming infrastructure relay on Monad connecting on-chain games to players with low-latency transaction routing.", category: "Gaming", url: "#" },
  { name: "Yap on Chain", icon: null, description: "On-chain social gaming protocol on Monad with token and game contract deployment for community games.", category: "Gaming", url: "#" },
  { name: "Symphony", icon: null, description: "AI agent launchpad and cross-chain intent protocol on Monad combining smart accounts, solver routing, and agent infrastructure.", category: "AI", url: "#" },
  { name: "Blazpay", icon: null, description: "AI abstraction infrastructure on Monad providing staking, gaming, and entry pass contracts for AI-powered payment flows.", category: "AI", url: "#" },
  { name: "Fortytwo", icon: null, description: "Decentralized AI inference protocol on Monad with on-chain node ratings and verifiable compute for AI model serving.", category: "AI", url: "#" },
  { name: "GM Agents", icon: null, description: "AI agent launchpad on Monad combining consumer AI tools, community data feeds, and autonomous on-chain agent deployment.", category: "AI", url: "#" },
  { name: "aiCraft.fun", icon: null, description: "AI-powered agent launchpad on Monad enabling users to deploy and monetize autonomous on-chain AI agents.", category: "AI", url: "#" },
  { name: "Sela Network", icon: null, description: "Decentralized AI data and compute network on Monad providing on-chain data collection and DePIN compute infrastructure.", category: "AI", url: "#" },
  { name: "Codatta", icon: null, description: "AI data marketplace on Monad enabling contributors to provide and monetize training datasets for machine learning models.", category: "AI", url: "#" },
  { name: "Monadata AI", icon: null, description: "AI data labelling protocol on Monad providing structured datasets and DePIN-based data pipelines for AI training.", category: "AI", url: "#" },
  { name: "OpenPad AI", icon: null, description: "AI-powered launchpad on Monad leveraging on-chain data to surface and fund emerging AI projects in the ecosystem.", category: "AI", url: "#" },
  { name: "KINETK", icon: null, description: "AI-powered IP certification and data protocol on Monad enabling verifiable credentials for digital content ownership.", category: "AI", url: "#" },
  { name: "Proof-of-Skill", icon: null, description: "AI consumer protocol on Monad enabling on-chain verification of real-world skills and competency credentials.", category: "AI", url: "#" },
  { name: "Monad Baby", icon: null, description: "AI agent launchpad on Monad deploying autonomous agents with on-chain interaction and community coordination.", category: "AI", url: "#" },
  { name: "MemeAIAssistant", icon: null, description: "AI-powered meme creation and NFT minting protocol on Monad with daily sign-in rewards and community engagement.", category: "AI", url: "#" },
  { name: "MonadAI", icon: null, description: "AI-powered token launchpad on Monad with bonding curve factory and routing for community-driven AI token launches.", category: "AI", url: "#" },
  { name: "M0narch", icon: null, description: "On-chain casino on Monad with roulette, RPS, plinko, coinflip, and price prediction games.", category: "Consumer", url: "#" },
  { name: "Chaquen", icon: null, description: "On-chain sports betting protocol on Monad with league factory, player NFTs, and community betting pools.", category: "Consumer", url: "#" },
  { name: "Griffy", icon: null, description: "On-chain betting game on Monad with provably fair mechanics and instant wager settlement.", category: "Consumer", url: "#" },
  { name: "RareBetSports", icon: null, description: "Sports prediction market on Monad with on-chain oracle pricing and slip-based bet management.", category: "Consumer", url: "#" },
  { name: "YieldKingZ", icon: null, description: "NFT-based yield gaming protocol on Monad with treasury management, item shop, and marketplace mechanics.", category: "Consumer", url: "#" },
  { name: "Castora", icon: null, description: "On-chain prediction market on Monad enabling community-created markets with decentralized resolution.", category: "Consumer", url: "#" },
  { name: "Opinion Labs", icon: null, description: "Prediction market protocol on Monad with conditional tokens, Gnosis Safe integration, and a live exchange.", category: "Consumer", url: "#" },
  { name: "Prediction3", icon: null, description: "On-chain prediction market factory on Monad for deploying community-run forecasting markets.", category: "Consumer", url: "#" },
  { name: "Blocklive", icon: null, description: "Web3 event ticketing protocol on Monad enabling on-chain ticket issuance, transfer, and venue access.", category: "Consumer", url: "#" },
  { name: "Fizen.io", icon: null, description: "E-commerce and ticketing distributor protocol on Monad connecting real-world commerce to on-chain payments.", category: "Consumer", url: "#" },
  { name: "Fantasy Top", icon: null, description: "Fantasy sports platform on Monad with on-chain market contracts and player card trading mechanics.", category: "Consumer", url: "#" },
  { name: "MUKU", icon: null, description: "Social challenge platform on Monad with AI-powered challenge results and community competition mechanics.", category: "Consumer", url: "#" },
  { name: "Moseiki", icon: null, description: "Decentralized social protocol on Monad with on-chain handle registration and post minting infrastructure.", category: "Consumer", url: "#" },
  { name: "Opals", icon: null, description: "Social token factory on Monad enabling creators to launch and manage community tokens and social economies.", category: "Consumer", url: "#" },
  { name: "Talentum", icon: null, description: "Talent and social protocol on Monad with payroll, staking, and daily activity rewards for contributors.", category: "Consumer", url: "#" },
  { name: "X-Mail", icon: null, description: "Decentralized messaging protocol on Monad enabling on-chain email and communication between wallet addresses.", category: "Consumer", url: "#" },
  { name: "sidekick", icon: null, description: "Social companion protocol on Monad providing on-chain social graph and interaction infrastructure.", category: "Consumer", url: "#" },
  { name: "Dusted", icon: null, description: "Social protocol on Monad enabling community-driven content creation and on-chain social interactions.", category: "Consumer", url: "#" },
  { name: "LootGO", icon: null, description: "Consumer rewards protocol on Monad enabling location-based loot drops and on-chain reward collection.", category: "Consumer", url: "#" },
  { name: "Slogain", icon: null, description: "Community protocol on Monad enabling on-chain slogan creation, voting, and community expression.", category: "Consumer", url: "#" },
  { name: "Acurast", icon: null, description: "Decentralized compute network on Monad enabling confidential off-chain computation with on-chain verification.", category: "DePIN", url: "https://acurast.com" },
  { name: "The Vape Labs", icon: null, description: "DePIN data collection protocol on Monad gathering real-world data through a decentralized network of contributors.", category: "DePIN", url: "#" },
];

const BRAND = {
  primary: "#6E54FF",
  primaryBg: "rgba(110,84,255,0.10)",
  primaryBorder: "rgba(110,84,255,0.30)",
  primaryStrong: "rgba(110,84,255,0.50)",
  tint: "#DDD7FE",
};

const THEMES = {
  dark: {
    bg: "#0E091C",
    navBg: "rgba(14,9,28,0.92)",
    navBorder: "rgba(255,255,255,0.07)",
    cardBg: "rgba(255,255,255,0.03)",
    cardBorder: "rgba(255,255,255,0.08)",
    cardHoverBg: BRAND.primaryBg,
    cardHoverBorder: BRAND.primaryStrong,
    titleColor: "#FFFFFF",
    textPrimary: "#FFFFFF",
    textSecondary: "rgba(255,255,255,0.45)",
    textMuted: "rgba(221,215,254,0.35)",
    eyebrowText: BRAND.tint,
    eyebrowBg: BRAND.primaryBg,
    eyebrowBorder: BRAND.primaryBorder,
    btnBorder: "rgba(255,255,255,0.10)",
    btnColor: "rgba(221,215,254,0.40)",
    btnHoverBorder: "rgba(110,84,255,0.45)",
    btnHoverColor: BRAND.tint,
    btnHoverBg: "rgba(110,84,255,0.08)",
    btnActiveBg: "rgba(110,84,255,0.15)",
    btnActiveBorder: "rgba(110,84,255,0.60)",
    btnActiveColor: BRAND.tint,
    loadMoreBorder: BRAND.primaryBorder,
    loadMoreColor: "rgba(221,215,254,0.55)",
    loadMoreHoverBg: BRAND.primaryBg,
    loadMoreHoverBorder: BRAND.primaryStrong,
    loadMoreHoverColor: BRAND.tint,
    footerBorder: "rgba(255,255,255,0.07)",
    footerColor: "rgba(221,215,254,0.30)",
    iconBg: BRAND.primaryBg,
    iconBorder: BRAND.primaryBorder,
    visitColor: "rgba(221,215,254,0.35)",
    visitHoverColor: BRAND.tint,
    toggleBg: "rgba(255,255,255,0.06)",
    toggleBorder: "rgba(255,255,255,0.12)",
    toggleColor: "rgba(221,215,254,0.60)",
    badgeColors: {
      DeFi: { bg: "rgba(110,84,255,0.12)", border: "rgba(110,84,255,0.35)", text: "#DDD7FE" },
      NFT: { bg: "rgba(255,142,228,0.10)", border: "rgba(255,142,228,0.30)", text: "#FF8EE4" },
      Infra: { bg: "rgba(133,230,255,0.10)", border: "rgba(133,230,255,0.30)", text: "#85E6FF" },
      Tools: { bg: "rgba(255,174,69,0.10)", border: "rgba(255,174,69,0.30)", text: "#FFAE45" },
      Gaming: { bg: "rgba(80,220,120,0.10)", border: "rgba(80,220,120,0.30)", text: "#50DC78" },
      AI: { bg: "rgba(255,100,100,0.10)", border: "rgba(255,100,100,0.30)", text: "#FF8080" },
      Consumer: { bg: "rgba(255,200,50,0.10)", border: "rgba(255,200,50,0.30)", text: "#FFC832" },
      DePIN: { bg: "rgba(50,200,200,0.10)", border: "rgba(50,200,200,0.30)", text: "#32C8C8" },
    },
  },
  light: {
    bg: "#EEE9FF",
    navBg: "rgba(238,233,255,0.92)",
    navBorder: "rgba(0,0,0,0.08)",
    cardBg: "#FFFFFF",
    cardBorder: "rgba(110,84,255,0.10)",
    cardHoverBg: "rgba(110,84,255,0.05)",
    cardHoverBorder: BRAND.primary,
    titleColor: "#0E091C",
    textPrimary: "#0E091C",
    textSecondary: "rgba(14,9,28,0.55)",
    textMuted: "rgba(14,9,28,0.38)",
    eyebrowText: BRAND.primary,
    eyebrowBg: "rgba(110,84,255,0.07)",
    eyebrowBorder: "rgba(110,84,255,0.20)",
    btnBorder: "rgba(110,84,255,0.20)",
    btnColor: "rgba(14,9,28,0.45)",
    btnHoverBorder: BRAND.primary,
    btnHoverColor: BRAND.primary,
    btnHoverBg: "rgba(110,84,255,0.06)",
    btnActiveBg: "rgba(110,84,255,0.10)",
    btnActiveBorder: BRAND.primary,
    btnActiveColor: BRAND.primary,
    loadMoreBorder: "rgba(110,84,255,0.30)",
    loadMoreColor: BRAND.primary,
    loadMoreHoverBg: "rgba(110,84,255,0.07)",
    loadMoreHoverBorder: BRAND.primary,
    loadMoreHoverColor: BRAND.primary,
    footerBorder: "rgba(0,0,0,0.07)",
    footerColor: "rgba(14,9,28,0.30)",
    iconBg: "rgba(110,84,255,0.08)",
    iconBorder: "rgba(110,84,255,0.18)",
    visitColor: "rgba(110,84,255,0.45)",
    visitHoverColor: BRAND.primary,
    toggleBg: "rgba(110,84,255,0.06)",
    toggleBorder: "rgba(110,84,255,0.20)",
    toggleColor: BRAND.primary,
    badgeColors: {
      DeFi: { bg: "rgba(110,84,255,0.08)", border: "rgba(110,84,255,0.22)", text: BRAND.primary },
      NFT: { bg: "rgba(180,0,140,0.06)", border: "rgba(180,0,140,0.20)", text: "#A0007A" },
      Infra: { bg: "rgba(0,120,180,0.07)", border: "rgba(0,120,180,0.20)", text: "#005F99" },
      Tools: { bg: "rgba(160,80,0,0.07)", border: "rgba(160,80,0,0.20)", text: "#8A4400" },
      Gaming: { bg: "rgba(0,140,60,0.07)", border: "rgba(0,140,60,0.20)", text: "#006830" },
      AI: { bg: "rgba(180,0,0,0.06)", border: "rgba(180,0,0,0.18)", text: "#990000" },
      Consumer: { bg: "rgba(160,120,0,0.07)", border: "rgba(160,120,0,0.20)", text: "#7A5C00" },
      DePIN: { bg: "rgba(0,130,130,0.07)", border: "rgba(0,130,130,0.20)", text: "#006666" },
    },
  },
};

const CATEGORIES = ["All", "DeFi", "NFT", "Infra", "Gaming", "AI", "Consumer", "DePIN", "Tools"];

function CategoryBadge({ category, t }: any) {
  const c = t.badgeColors[category] || t.badgeColors.Tools;
  return (
    <span style={{
      background: c.bg,
      border: `1px solid ${c.border}`,
      color: c.text,
      fontSize: "11px",
      fontWeight: 600,
      letterSpacing: "0.07em",
      padding: "3px 9px",
      borderRadius: "99px",
      textTransform: "uppercase" as const,
    }}>{category}</span>
  );
}

function AppCard({ app, index, t }: { app: any; index: number; t: any }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? t.cardHoverBg : t.cardBg,
        border: `1px solid ${hovered ? t.cardHoverBorder : t.cardBorder}`,
        borderRadius: "16px",
        padding: "24px",
        display: "flex",
        flexDirection: "column" as const,
        gap: "12px",
        transition: "border-color 0.2s ease, background 0.2s ease, transform 0.2s ease",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        animationDelay: `${index * 40}ms`,
        animation: "fadeUp 0.45s ease both",
        cursor: "default",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
        <div style={{ width: 40, height: 40, borderRadius: 10, background: t.iconBg, border: `1px solid ${t.iconBorder}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>
          {app.icon
            ? <img src={app.icon} alt={app.name} style={{ width: 24, height: 24, objectFit: "contain" as const, borderRadius: 4 }} />
            : ["⚡","🌀","🔷","💎","🌊","✦","◈","⬡","⟡","◉","⬢","⬦","⌬","◐"][index % 14]
          }
        </div>
        <CategoryBadge category={app.category} t={t} />
      </div>
      <h3 style={{ margin: 0, fontSize: "16px", fontWeight: 700, color: t.textPrimary, fontFamily: "'DM Mono', monospace", letterSpacing: "-0.01em" }}>{app.name}</h3>
      <p style={{ margin: 0, fontSize: "13.5px", lineHeight: 1.65, color: t.textSecondary, flexGrow: 1, fontFamily: "'DM Sans', sans-serif" }}>{app.description}</p>
      <a href={app.url} target="_blank" rel="noopener noreferrer" style={{ marginTop: "4px", display: "inline-flex", alignItems: "center", gap: 6, fontSize: "12.5px", fontWeight: 600, color: hovered ? t.visitHoverColor : t.visitColor, textDecoration: "none", letterSpacing: "0.04em", textTransform: "uppercase" as const, transition: "color 0.2s", fontFamily: "'DM Mono', monospace" }}>
        Visit App
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </a>
    </div>
  );
}

function SunIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5"/>
      <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  );
}

const PAGE_SIZE = 9;

export default function MonadDirectory() {
  const [active, setActive] = useState("All");
  const [mounted, setMounted] = useState(false);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [isDark, setIsDark] = useState(true);
  useEffect(() => setMounted(true), []);

  const t = isDark ? THEMES.dark : THEMES.light;
  const filtered = active === "All" ? APPS : APPS.filter(a => a.category === active);
  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  function handleCategoryChange(cat: string) {
    setActive(cat);
    setVisibleCount(PAGE_SIZE);
  }

  return (
    <div style={{ minHeight: "100vh", background: t.bg, fontFamily: "'DM Sans', sans-serif", transition: "background 0.25s ease" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500;600&family=DM+Sans:wght@300;400;500;600;700&family=Syne:wght@700;800&display=swap');
        * { box-sizing: border-box; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes heroFade { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-thumb { background: rgba(110,84,255,0.30); border-radius: 3px; }
        .card-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(290px, 1fr)); gap: 18px; }
        @media (max-width: 768px) {
          .card-grid { grid-template-columns: 1fr; }
          .hero-title { font-size: 28px !important; }
          .nav-inner { padding: 14px 16px !important; }
          .nav-project-count { display: none; }
          .nav-right { gap: 8px !important; }
          .hero-section { padding: 48px 20px 36px !important; }
          .hero-body { font-size: 14px !important; }
          .filter-tabs { padding: 0 16px 36px !important; gap: 8px !important; }
          .grid-wrapper { padding: 0 16px 60px !important; }
          .load-more-btn { width: 100%; box-sizing: border-box; }
        }
        @media (max-width: 400px) {
          .hero-title { font-size: 22px !important; }
          .toggle-label { display: none; }
        }
      `}</style>

      <nav className="nav-inner" style={{ padding: "18px 40px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: `1px solid ${t.navBorder}`, backdropFilter: "blur(12px)", position: "sticky", top: 0, zIndex: 50, background: t.navBg, transition: "background 0.25s ease, border-color 0.25s ease" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img src="/logos/Logomark.png" alt="Monad" style={{ width: 30, height: 30, borderRadius: 6, display: "block" }} />
          <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, color: t.textPrimary, fontSize: 16, letterSpacing: "-0.01em", transition: "color 0.25s ease" }}>
            {"Monad's "}<span style={{ color: BRAND.primary }}>Most Valuable App</span>
          </span>
        </div>
        <div className="nav-right" style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span className="nav-project-count" style={{ fontSize: 12, color: t.textMuted, fontFamily: "'DM Mono', monospace", letterSpacing: "0.06em", transition: "color 0.25s ease" }}>{APPS.length} PROJECTS</span>
          <button onClick={() => setIsDark(d => !d)} style={{ display: "flex", alignItems: "center", gap: 6, background: t.toggleBg, border: `1px solid ${t.toggleBorder}`, color: t.toggleColor, borderRadius: "99px", padding: "6px 13px", fontSize: "12px", fontWeight: 600, fontFamily: "'DM Mono', monospace", letterSpacing: "0.04em", cursor: "pointer", transition: "all 0.2s ease" }}>
            {isDark ? <SunIcon /> : <MoonIcon />}
            <span className="toggle-label" style={{ textTransform: "uppercase" as const }}>{isDark ? "Light" : "Dark"}</span>
          </button>
        </div>
      </nav>

      <div>
        <div className="hero-section" style={{ textAlign: "center", padding: "80px 24px 56px", animation: mounted ? "heroFade 0.7s ease both" : "none" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: t.eyebrowBg, border: `1px solid ${t.eyebrowBorder}`, borderRadius: 99, padding: "6px 16px", marginBottom: 28, transition: "background 0.25s ease, border-color 0.25s ease" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: BRAND.primary, display: "inline-block" }} />
            <span style={{ fontSize: 11, fontWeight: 600, color: t.eyebrowText, letterSpacing: "0.1em", textTransform: "uppercase" as const, fontFamily: "'DM Mono', monospace", transition: "color 0.25s ease" }}>Ecosystem Directory</span>
          </div>
          <h1 className="hero-title" style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(36px, 5.5vw, 62px)", lineHeight: 1.1, letterSpacing: "-0.025em", margin: "0 0 18px", color: t.titleColor, transition: "color 0.25s ease" }}>
            {"Explore the "}
            <span style={{ background: `linear-gradient(120deg, ${BRAND.tint} 0%, ${BRAND.primary} 60%)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Monad</span>
            {" Ecosystem"}
          </h1>
          <p className="hero-body" style={{ maxWidth: 500, margin: "0 auto", fontSize: "16px", lineHeight: 1.7, color: t.textSecondary, fontFamily: "'DM Sans', sans-serif", fontWeight: 300, transition: "color 0.25s ease" }}>
            Discover the apps, protocols, and tools building on the fastest EVM-compatible L1. Curated and growing daily.
          </p>
        </div>

        <div className="filter-tabs" style={{ display: "flex", justifyContent: "center", gap: 10, padding: "0 24px 52px", flexWrap: "wrap" as const }}>
          {CATEGORIES.map(cat => {
            const isActive = active === cat;
            return (
              <button key={cat} onClick={() => handleCategoryChange(cat)}
                style={{ background: isActive ? t.btnActiveBg : "transparent", border: `1px solid ${isActive ? t.btnActiveBorder : t.btnBorder}`, color: isActive ? t.btnActiveColor : t.btnColor, padding: "8px 20px", borderRadius: "99px", fontSize: "13px", fontWeight: 600, letterSpacing: "0.04em", cursor: "pointer", transition: "all 0.2s ease", fontFamily: "'DM Mono', monospace", textTransform: "uppercase" as const }}
                onMouseEnter={e => { if (!isActive) { e.currentTarget.style.borderColor = t.btnHoverBorder; e.currentTarget.style.color = t.btnHoverColor; e.currentTarget.style.background = t.btnHoverBg; } }}
                onMouseLeave={e => { if (!isActive) { e.currentTarget.style.borderColor = t.btnBorder; e.currentTarget.style.color = t.btnColor; e.currentTarget.style.background = "transparent"; } }}
              >{cat}</button>
            );
          })}
        </div>

        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <span style={{ fontSize: 12, fontFamily: "'DM Mono', monospace", color: t.textMuted, letterSpacing: "0.08em", transition: "color 0.25s ease" }}>
            {filtered.length} {filtered.length === 1 ? "PROJECT" : "PROJECTS"}{active !== "All" ? ` IN ${active.toUpperCase()}` : ""}
          </span>
        </div>

        <div className="grid-wrapper" style={{ maxWidth: 1180, margin: "0 auto", padding: "0 24px 80px" }}>
          <div className="card-grid">
            {visible.map((app, i) => <AppCard key={app.name} app={app} index={i} t={t} />)}
          </div>
          {hasMore && (
            <div style={{ textAlign: "center", marginTop: 40 }}>
              <button className="load-more-btn" onClick={() => setVisibleCount(c => c + PAGE_SIZE)}
                style={{ background: "transparent", border: `1px solid ${t.loadMoreBorder}`, color: t.loadMoreColor, padding: "11px 36px", borderRadius: "99px", fontSize: "13px", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" as const, fontFamily: "'DM Mono', monospace", cursor: "pointer", transition: "all 0.2s ease" }}
                onMouseEnter={e => { e.currentTarget.style.background = t.loadMoreHoverBg; e.currentTarget.style.borderColor = t.loadMoreHoverBorder; e.currentTarget.style.color = t.loadMoreHoverColor; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = t.loadMoreBorder; e.currentTarget.style.color = t.loadMoreColor; }}
              >
                Load More <span style={{ marginLeft: 8, opacity: 0.5, fontSize: 11 }}>{filtered.length - visibleCount} remaining</span>
              </button>
            </div>
          )}
        </div>

        <div style={{ textAlign: "center", padding: "24px", borderTop: `1px solid ${t.footerBorder}`, color: t.footerColor, fontSize: 12, fontFamily: "'DM Mono', monospace", letterSpacing: "0.06em", transition: "color 0.25s ease, border-color 0.25s ease" }}>
          MONAD ECOSYSTEM DIRECTORY — COMMUNITY CURATED
        </div>
      </div>
    </div>
  );
}
