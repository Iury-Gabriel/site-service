import { PrismaClient } from '@prisma/client';
import SiteRepository from '../../domain/reservation/enterprise/repositories/SiteRepository';
import Site from '../../domain/reservation/enterprise/entities/Site';

export default class SiteRepositoryImpl extends SiteRepository {
    private prisma: PrismaClient;

    constructor() {
        super();
        this.prisma = new PrismaClient();
    }

    async save(site: Site): Promise<Site | undefined> {
        const newSiteData = await this.prisma.site.create({
            data: {
                id: site.getId(),
                name: site.getName(),
                rating: site.getRating(),
                pricePerDay: site.getPricePerDay(),
                location: site.getLocation(),
                description: site.getDescription(),
                images: site.getImages(),
                ownerId: site.getOwnerId(),
                createdAt: site.getCreatedAt(),
                updatedAt: site.getUpdatedAt(), 
            },
        });

        return new Site(
            newSiteData.id,
            newSiteData.ownerId,
            newSiteData.name,
            newSiteData.rating,
            newSiteData.pricePerDay,
            newSiteData.location,
            newSiteData.description,
            newSiteData.images,
            newSiteData.createdAt,
            newSiteData.updatedAt
        );
    }

    async findById(id: string): Promise<Site | undefined> {
        const siteData = await this.prisma.site.findUnique({
            where: { id },
        });

        if (!siteData) return undefined;

        return new Site(
            siteData.id,
            siteData.ownerId,
            siteData.name,
            siteData.rating,
            siteData.pricePerDay,
            siteData.location,
            siteData.description,   
            siteData.images,
            siteData.createdAt,
            siteData.updatedAt
        );
    }

    async getAll(): Promise<Site[] | undefined> {
        const sitesData = await this.prisma.site.findMany();
        return sitesData.map(siteData => new Site(
            siteData.id,
            siteData.ownerId,
            siteData.name,
            siteData.rating,
            siteData.pricePerDay,
            siteData.location,
            siteData.description,
            siteData.images,
            siteData.createdAt,
            siteData.updatedAt
        ));
    }

    async deleteSite(id: string): Promise<Site | undefined> {
        const siteData = await this.prisma.site.delete({
            where: { id },
        });

        return new Site(
            siteData.id,
            siteData.ownerId,
            siteData.name,
            siteData.rating,
            siteData.pricePerDay,
            siteData.location,
            siteData.description,   
            siteData.images,
            siteData.createdAt,
            siteData.updatedAt
        );
    }
}
