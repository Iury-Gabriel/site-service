import Site from "../../enterprise/entities/Site";
import SiteRepository from "../../enterprise/repositories/SiteRepository";


interface FindSiteData {
    siteId: string;
}

export default class FindSite {
    private siteRepository: SiteRepository;

    constructor(siteRepository: SiteRepository) {
        this.siteRepository = siteRepository;
    }

    async execute(data: FindSiteData): Promise<Site | undefined> {
        const site = await this.siteRepository.findById(data.siteId);
        if (!site) {
            throw new Error('Site não encontrada');
        }

        return site
    }
}
