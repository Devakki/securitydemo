<?php

namespace App\Controller;

use App\Entity\Blog;
use App\Form\BlogType;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class BlogController extends AbstractController
{
    public function __construct(
        EntityManagerInterface $entityManager,   
        
    ) {
        $this->entityManager  = $entityManager; 
    }


    #[Route('/blog', name: 'app_blog')]
    public function index(Request $request): Response
    {
       $blog = new Blog();
       $addForm = $this->createForm(BlogType::class, $blog);
       $addForm->handleRequest($request);

       if($addForm->isSubmitted())
        {
             $this->entityManager->persist($blog);
             $this->entityManager->flush();

            return $this->redirectToRoute('dashboard');
        }

         return $this->render('blog/index.html.twig', [
            'form'  => $addForm->createView(),
            'title' => 'Blog',
            'route' => ['list' => 'blog_list'],
        ]);
    }
}
