import express, { Request, Response } from "express";
import SiteRepositoryImpl from "./infrastructure/database/SiteRepositoryImpl";
import RegisterSite from "./domain/reservation/application/use-cases/create-site";
import DeleteSite from "./domain/reservation/application/use-cases/delete-site";
import GetAllSites from "./domain/reservation/application/use-cases/get-all-sites";
import FindSite from "./domain/reservation/application/use-cases/find-site-by-id";
import SiteController from "./presentation/controllers/SiteController";
import multer from 'multer';
import cors from 'cors';
import path from 'path';

const app = express();
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'uploads/sites');
        },
        filename: (req, file, cb) => {
            cb(null, `${Date.now()}-${file.originalname}`);  
        }
    })
});


const siteRepository = new SiteRepositoryImpl();
const createSiteUseCase = new RegisterSite(siteRepository); 
const deleteSiteUseCase = new DeleteSite(siteRepository); 
const getAllSitesUseCase = new GetAllSites(siteRepository); 
const findSitesByIdUseCase = new FindSite(siteRepository);

const siteController = new SiteController(
    createSiteUseCase,
    deleteSiteUseCase,
    findSitesByIdUseCase,
    getAllSitesUseCase
);

// Rotas
app.post('/sites', upload.array('images', 10), async (req: Request, res: Response) => {
    try {
        const files = req.files as Express.Multer.File[]; 
        const images = files.map((file) => file.path);
        const site = await siteController.register(req, res, images);
        res.status(201).json(site);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/sites/:id', (req: Request, res: Response) => siteController.delete(req, res));
app.get('/sites/:siteId', (req: Request, res: Response) => siteController.findSiteById(req, res));
app.get('/sites', (req: Request, res: Response) => siteController.getAll(req, res));

app.listen({ port: 3000, host: '0.0.0.0' }, () => {
    console.log("Server is running on http://localhost:3001");
});