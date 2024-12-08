import { Request, Response } from 'express';
import RegisterSite from '../../domain/reservation/application/use-cases/create-site';
import DeleteSite from '../../domain/reservation/application/use-cases/delete-site';
import FindSite from '../../domain/reservation/application/use-cases/find-site-by-id';
import GetAllSites from '../../domain/reservation/application/use-cases/get-all-sites';

export default class SiteController {
    private createSiteUseCase: RegisterSite;
    private deleteSiteUseCase: DeleteSite;
    private FindSiteUseCase: FindSite;
    private GetAllSitesUseCase: GetAllSites;

    constructor(
        createSiteUseCase: RegisterSite,
        deleteSiteUseCase: DeleteSite,
        FindSiteUseCase: FindSite,
        GetAllSitesUseCase: GetAllSites
    ) {
        this.createSiteUseCase = createSiteUseCase;
        this.deleteSiteUseCase = deleteSiteUseCase;
        this.FindSiteUseCase = FindSiteUseCase;
        this.GetAllSitesUseCase = GetAllSitesUseCase;
    }

    async register(req: Request, res: Response, images: string[]): Promise<void> {
        try {
            const site = await this.createSiteUseCase.execute(req.body, images);
            res.status(201).json(site);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }


    async delete(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;

            if (!id) {
                res.status(400).json({ error: 'id is required' });
                return;
            }

            const { userId } = req.body;
            const deletedSite = await this.deleteSiteUseCase.execute({ id, userId });
            if (!deletedSite) {
                res.status(404).json({ error: 'site not found' });
                return;
            }
            res.status(200).json(deletedSite);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async getAll(req: Request, res: Response): Promise<void> {
        try {
            const sites = await this.GetAllSitesUseCase.execute();
            if (!sites) {
                res.status(404).json({ error: 'sites not found' });
                return;
            }
            res.status(200).json(sites);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async findSiteById(req: Request, res: Response): Promise<void> {
        try {
            const { siteId } = req.params;

            if (!siteId) {
                res.status(400).json({ error: 'id is required' });
                return;
            }
            const site = await this.FindSiteUseCase.execute({siteId});
            if (!site) {
                res.status(404).json({ error: 'site not found' });
                return;
            }
            res.status(200).json(site);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}
