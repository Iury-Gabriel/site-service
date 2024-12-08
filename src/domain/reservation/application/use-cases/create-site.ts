import Site from '../../enterprise/entities/Site';
import SiteRepository from '../../enterprise/repositories/SiteRepository';

interface RegisterSiteData {
    id: string;
    ownerId: string;
    name: string;
    rating: number;
    pricePerDay: number;
    location: string;
    description: string;
    images: string[];
    createdAt: Date;
    updatedAt: Date;
}

export default class RegisterSite {
    private siteRepository: SiteRepository;

    constructor(siteRepository: SiteRepository) {
        this.siteRepository = siteRepository;
    }

    async execute(data: RegisterSiteData, images: string[]): Promise<Site | undefined> {
        const site = new Site(
            data.id,
            data.ownerId,
            data.name,
            data.rating,
            data.pricePerDay,
            data.location,
            data.description,
            images,
            data.createdAt,
            data.updatedAt
        );
    
        return await this.siteRepository.save(site);
    }
    
}
