<?php

namespace App\Controller;

use App\Entity\Customer;
use App\Form\CustomerType;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class CustomerController extends AbstractController
{

    public function __construct(
        EntityManagerInterface $entityManager,
    ) {
        $this->entityManager  = $entityManager;
    }

    #[Route('/customer', name: 'customer')]
    public function index(Request $request): Response
    {
        $customer = new Customer(); 

        $addForm = $this->createForm(CustomerType::class, $customer);
        $addForm->handleRequest($request);
        
        if($addForm->isSubmitted())
        {

          $this->entityManager->persist($customer);
            $this->entityManager->flush();

            return $this->redirectToRoute('dashboard');
        }

         return $this->render('customer/index.html.twig', [
            'form'  => $addForm->createView(),
            'title' => 'Customer',
            'route' => ['list' => 'customer_list'],
        ]);
    }
}