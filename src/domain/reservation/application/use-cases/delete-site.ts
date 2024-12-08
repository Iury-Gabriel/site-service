import Site from "../../enterprise/entities/Site";
import SiteRepository from "../../enterprise/repositories/SiteRepository";


interface DeleteSiteData {
    id: string;
    userId: string;
}

export default class DeleteSite {
    private siteRepository: SiteRepository;

    constructor(siteRepository: SiteRepository) {
        this.siteRepository = siteRepository;
    }

    async execute(data: DeleteSiteData): Promise<Site | undefined> {
        const site = await this.siteRepository.findById(data.id);
        if (!site) {
            throw new Error('Site não encontrada.');
        }

        if (site.getOwnerId() !== data.userId) {
            throw new Error('Você não tem permissão para deletar esse sitio');
        }

        return await this.siteRepository.deleteSite(data.id);
    }
}
