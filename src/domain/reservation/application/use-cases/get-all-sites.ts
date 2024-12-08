import Site from "../../enterprise/entities/Site";
import SiteRepository from "../../enterprise/repositories/SiteRepository";

export default class GetAllSites {
    private siteRepository: SiteRepository;

    constructor(siteRepository: SiteRepository) {
        this.siteRepository = siteRepository;
    }

    async execute(): Promise<Site[] | undefined> {
        const sites = await this.siteRepository.getAll();
        if (!sites) {
            throw new Error('Sites não encontrados');
        }

        return sites
    }
}
