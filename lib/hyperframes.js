const fs = require('fs');
const path = require('path');

/**
 * Reads the local hyperframes.json to resolve the project's asset directory.
 * If hyperframes.json does not exist, defaults to './assets'.
 * @returns {{ assetDir: string, assetDirAbs: string, blocksDir: string, config: object|null }}
 */
function getHyperframesConfig() {
    const configPath = path.join(process.cwd(), 'hyperframes.json');
    let config = null;
    let assetDir = 'assets';
    let blocksDir = 'compositions';

    if (fs.existsSync(configPath)) {
        try {
            config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
            if (config.paths && config.paths.assets) {
                assetDir = config.paths.assets;
            }
            if (config.paths && config.paths.blocks) {
                blocksDir = config.paths.blocks;
            }
        } catch (e) {
            console.error('[AssetFlow] Warning: hyperframes.json exists but is invalid JSON. Falling back to defaults.');
        }
    } else {
        console.log('[AssetFlow] Notice: No hyperframes.json found. Using default asset directory: ./assets');
    }

    const assetDirAbs = path.resolve(process.cwd(), assetDir);
    const blocksDirAbs = path.resolve(process.cwd(), blocksDir);

    // Ensure the asset directory exists
    if (!fs.existsSync(assetDirAbs)) {
        fs.mkdirSync(assetDirAbs, { recursive: true });
    }

    return { assetDir, assetDirAbs, blocksDir, blocksDirAbs, config };
}

/**
 * Resolves a relative file path inside the configured assets directory.
 * @param {string} filename - e.g. 'intro.mp4'
 * @returns {string} absolute path
 */
function resolveAssetPath(filename) {
    const { assetDirAbs } = getHyperframesConfig();
    return path.join(assetDirAbs, filename);
}

/**
 * Returns the relative asset path from the project root (for agent use in HTML).
 * @param {string} filename - e.g. 'intro.mp4'
 * @returns {string} relative path like 'assets/intro.mp4'
 */
function getRelativeAssetPath(filename) {
    const { assetDir } = getHyperframesConfig();
    // Normalize assetDir to forward slashes for web-relative URLs
    const normalizedAssetDir = assetDir.replace(/\\/g, '/');
    return path.posix.join(normalizedAssetDir, filename).replace(/\\/g, '/');
}

module.exports = {
    getHyperframesConfig,
    resolveAssetPath,
    getRelativeAssetPath
};
